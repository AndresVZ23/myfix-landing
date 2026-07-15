import { NextResponse } from "next/server";
import { buildWebhookPayload, validateLead } from "@/lib/leads";

export const runtime = "nodejs";

const WEBHOOK_TIMEOUT_MS = 10_000;

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

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS);
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(buildWebhookPayload(validation.lead, webhookUrl)),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`[leads] el webhook respondió HTTP ${response.status}`);
      return NextResponse.json(
        {
          ok: false,
          error:
            "No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo o escríbenos directamente.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    const reason = error instanceof Error ? error.name : "desconocido";
    console.error(`[leads] error al contactar el webhook (${reason})`);
    return NextResponse.json(
      {
        ok: false,
        error:
          "No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo o escríbenos directamente.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
