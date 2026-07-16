import { NextResponse } from "next/server";
import { buildWebhookPayload, isFormSubmitUrl, validateLead } from "@/lib/leads";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";

const WEBHOOK_TIMEOUT_MS = 10_000;

/**
 * Origen del navegador que hizo la petición. FormSubmit exige un `Origin`
 * de navegador y la activación es por-origen, así que reenviamos el origen
 * REAL de la petición (autocorrige el dominio en local, preview y prod sin
 * depender de configuración). Cae a `SITE.url` solo si no llega ninguno.
 */
function resolveForwardOrigin(request: Request): string {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const host = request.headers.get("host");
  if (host) {
    const proto = request.headers.get("x-forwarded-proto") ?? "https";
    return `${proto}://${host}`;
  }
  return SITE.url;
}

/**
 * Recibe una solicitud de acceso y la reenvía al webhook de leads
 * (`LEADS_WEBHOOK_URL`). Nunca simula éxito: si el webhook no está
 * configurado o falla, responde con un error claro. No registra datos
 * personales en los logs.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "El cuerpo de la solicitud no es JSON válido." },
      { status: 400 },
    );
  }

  // Honeypot anti-spam: los bots suelen rellenar todos los campos.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).length > 0
  ) {
    console.warn("[leads] solicitud descartada por honeypot");
    return NextResponse.json(
      { ok: false, error: "No pudimos procesar tu solicitud." },
      { status: 400 },
    );
  }

  const validation = validateLead(body);
  if (!validation.ok) {
    console.warn(
      `[leads] solicitud inválida (campos: ${Object.keys(validation.errors).join(", ")})`,
    );
    return NextResponse.json(
      { ok: false, error: "Revisa los campos marcados.", errors: validation.errors },
      { status: 422 },
    );
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error(
      "[leads] LEADS_WEBHOOK_URL no está configurada; la solicitud no se envió",
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "El envío de solicitudes no está configurado en este entorno. Escríbenos directamente por correo o WhatsApp.",
      },
      { status: 503 },
    );
  }

  const isFormSubmit = isFormSubmitUrl(webhookUrl);
  const genericError =
    "No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo o escríbenos directamente.";

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        // FormSubmit exige un origen de navegador; reenviamos el de la
        // petición real (autocorrige el dominio en cualquier entorno).
        ...(isFormSubmit
          ? (() => {
              const origin = resolveForwardOrigin(request);
              return { Origin: origin, Referer: `${origin}/` };
            })()
          : {}),
      },
      body: JSON.stringify(buildWebhookPayload(validation.lead, webhookUrl)),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    // DIAGNÓSTICO TEMPORAL: expone el estado real del webhook para depurar
    // el 502 en producción. Se retira tras el diagnóstico.
    const debugRaw = await response.clone().text().catch(() => "");
    if (!response.ok) {
      console.error(`[leads] el webhook respondió HTTP ${response.status}`);
      return NextResponse.json(
        { ok: false, error: genericError, _debug: { status: response.status, body: debugRaw.slice(0, 300) } },
        { status: 502 },
      );
    }

    // FormSubmit responde 200 aunque rechace: hay que leer su campo `success`.
    // Nunca simulamos éxito (regla de credibilidad del brief).
    if (isFormSubmit) {
      const payload = (await response.json().catch(() => null)) as
        | { success?: string | boolean; message?: string }
        | null;
      const succeeded = payload?.success === true || payload?.success === "true";
      if (!succeeded) {
        const needsActivation = /activation/i.test(payload?.message ?? "");
        console.error(
          `[leads] FormSubmit rechazó el envío${needsActivation ? " (formulario sin activar)" : ""}`,
        );
        return NextResponse.json(
          {
            ok: false,
            error: needsActivation
              ? "El buzón de solicitudes aún no está activado. Escríbenos directamente mientras lo habilitamos."
              : genericError,
            _debug: {
              status: response.status,
              success: payload?.success ?? null,
              message: payload?.message ?? debugRaw.slice(0, 300),
              forwardedOrigin: resolveForwardOrigin(request),
            },
          },
          { status: 502 },
        );
      }
    }
  } catch (error) {
    const reason = error instanceof Error ? error.name : "desconocido";
    console.error(`[leads] error al contactar el webhook (${reason})`);
    return NextResponse.json({ ok: false, error: genericError }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
