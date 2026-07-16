"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BUSINESS_TYPES,
  buildWebhookPayload,
  LEAD_COUNTRIES,
  MAIN_PROBLEMS,
  validateLead,
  type LeadErrors,
} from "@/lib/leads";
import { track } from "@/lib/track";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const FIELD_ORDER = [
  "name",
  "company",
  "phone",
  "email",
  "country",
  "businessType",
  "mainProblem",
  "consent",
] as const;

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<LeadErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Modal de confirmación al enviarse la solicitud.
  useEffect(() => {
    if (status === "success") dialogRef.current?.showModal();
  }, [status]);

  const onFirstInteraction = () => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("lead_form_start");
    }
  };

  const focusFirstError = (fieldErrors: LeadErrors) => {
    const first = FIELD_ORDER.find((field) => fieldErrors[field]);
    if (first && formRef.current) {
      const element = formRef.current.querySelector<HTMLElement>(`#lead-${first}`);
      element?.focus();
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;
    const formData = new FormData(event.currentTarget);
    const body = {
      name: formData.get("name"),
      company: formData.get("company"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      country: formData.get("country"),
      businessType: formData.get("businessType"),
      mainProblem: formData.get("mainProblem"),
      consent: formData.get("consent") === "on",
      website: formData.get("website"),
    };

    // Honeypot: si el campo oculto viene con contenido, es un bot. No
    // enviamos y salimos en silencio (no revelamos la detección).
    if (typeof body.website === "string" && body.website.length > 0) {
      return;
    }

    const validation = validateLead(body);
    if (!validation.ok) {
      setErrors(validation.errors);
      setServerError(null);
      focusFirstError(validation.errors);
      return;
    }

    setErrors({});
    setServerError(null);
    setStatus("sending");
    track("lead_form_submit");

    try {
      // Envío DIRECTO desde el navegador a FormSubmit: pasa el challenge de
      // Cloudflare (el server-side desde Vercel es bloqueado con 403).
      const response = await fetch(SITE.leadsEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(buildWebhookPayload(validation.lead, SITE.leadsEndpoint)),
      });
      const payload = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;
      const succeeded = payload?.success === true || payload?.success === "true";

      if (response.ok && succeeded) {
        setStatus("success");
        track("lead_form_success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }

      // Nunca fingimos éxito: distinguimos "falta activar" del error genérico.
      const needsActivation = /activation/i.test(payload?.message ?? "");
      setStatus("error");
      setServerError(
        needsActivation
          ? "El buzón de solicitudes aún no está activado."
          : "No pudimos registrar tu solicitud en este momento. Inténtalo de nuevo.",
      );
      track("lead_form_error", { status: response.status });
      requestAnimationFrame(() => alertRef.current?.focus());
    } catch {
      setStatus("error");
      setServerError("No pudimos conectar en este momento. Revisa tu conexión.");
      track("lead_form_error", { status: 0 });
      requestAnimationFrame(() => alertRef.current?.focus());
    }
  };

  if (status === "success") {
    return (
      <>
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="card border-teal-deep/25 bg-teal/5 p-8 text-center"
        >
          <svg
            viewBox="0 0 24 24"
            className="mx-auto h-10 w-10 text-teal-deep"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12.5l3 3 5-6" />
          </svg>
          <h3 className="mt-4 font-display text-xl font-extrabold text-ink">
            Solicitud enviada
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Gracias por tu interés. Revisaremos tu solicitud y te contactaremos
            por WhatsApp o correo.
          </p>
        </div>

        <dialog
          ref={dialogRef}
          onClose={() => successRef.current?.focus()}
          aria-labelledby="lead-exito-titulo"
          className="m-auto w-[calc(100%-2.5rem)] max-w-md rounded-2xl border border-line bg-white p-8 text-center shadow-2xl backdrop:bg-ink/55"
        >
          <span
            aria-hidden="true"
            className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-teal/10"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8 text-teal-deep"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12.5l3 3 5-6" />
            </svg>
          </span>
          <h3
            id="lead-exito-titulo"
            className="mt-4 font-display text-2xl font-extrabold text-ink"
          >
            ¡Solicitud enviada!
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft sm:text-base">
            Recibimos tus datos correctamente. Nos comunicaremos contigo lo más
            pronto posible por WhatsApp o correo.
          </p>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="btn-primary mt-6 w-full sm:w-auto sm:px-10"
          >
            Entendido
          </button>
        </dialog>
      </>
    );
  }

  const inputClass = (field: keyof LeadErrors) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-faint transition focus:border-violet ${
      errors[field] ? "border-red-500" : "border-field"
    }`;

  const errorText = (field: keyof LeadErrors) =>
    errors[field] ? (
      <p id={`lead-${field}-error`} className="mt-1.5 text-xs font-medium text-red-600">
        {errors[field]}
      </p>
    ) : null;

  const errorProps = (field: keyof LeadErrors) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `lead-${field}-error` : undefined,
  });

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onFocus={onFirstInteraction}
      noValidate
      className="card relative p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-sm font-semibold text-ink">
            Nombre <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Ej. María Fernández"
            className={inputClass("name")}
            {...errorProps("name")}
          />
          {errorText("name")}
        </div>

        <div>
          <label htmlFor="lead-company" className="mb-1.5 block text-sm font-semibold text-ink">
            Empresa o negocio <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <input
            id="lead-company"
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="Ej. Ferretería San Martín"
            className={inputClass("company")}
            {...errorProps("company")}
          />
          {errorText("company")}
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-semibold text-ink">
            Teléfono o WhatsApp <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="+51 987 654 321"
            className={inputClass("phone")}
            {...errorProps("phone")}
          />
          {errorText("phone")}
        </div>

        <div>
          <label htmlFor="lead-email" className="mb-1.5 block text-sm font-semibold text-ink">
            Correo <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="tucorreo@empresa.com"
            className={inputClass("email")}
            {...errorProps("email")}
          />
          {errorText("email")}
        </div>

        <div>
          <label htmlFor="lead-country" className="mb-1.5 block text-sm font-semibold text-ink">
            País <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <select
            id="lead-country"
            name="country"
            required
            defaultValue="PE"
            className={inputClass("country")}
            {...errorProps("country")}
          >
            {LEAD_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
                {country.dial ? ` (${country.dial})` : ""}
              </option>
            ))}
          </select>
          {errorText("country")}
        </div>

        <div>
          <label htmlFor="lead-businessType" className="mb-1.5 block text-sm font-semibold text-ink">
            Tipo de negocio <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <select
            id="lead-businessType"
            name="businessType"
            required
            defaultValue=""
            className={inputClass("businessType")}
            {...errorProps("businessType")}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errorText("businessType")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="lead-mainProblem" className="mb-1.5 block text-sm font-semibold text-ink">
            Principal problema operativo <span aria-hidden="true" className="text-violet-deep">*</span>
          </label>
          <select
            id="lead-mainProblem"
            name="mainProblem"
            required
            defaultValue=""
            className={inputClass("mainProblem")}
            {...errorProps("mainProblem")}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {MAIN_PROBLEMS.map((problem) => (
              <option key={problem} value={problem}>
                {problem}
              </option>
            ))}
          </select>
          {errorText("mainProblem")}
        </div>
      </div>

      {/* Honeypot anti-spam: oculto para personas, visible para bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="lead-website">No completes este campo</label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-soft">
          <input
            id="lead-consent"
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#6d4aff]"
            {...errorProps("consent")}
          />
          <span>
            Acepto que MyFix almacene y trate mis datos para responder esta
            solicitud, según la{" "}
            <Link
              href="/privacidad"
              className="font-semibold text-violet-deep underline decoration-violet/40 underline-offset-2"
            >
              política de privacidad
            </Link>
            . <span aria-hidden="true" className="text-violet-deep">*</span>
          </span>
        </label>
        {errorText("consent")}
      </div>

      <button
        type="submit"
        aria-disabled={status === "sending"}
        className={`btn-primary mt-7 w-full ${
          status === "sending" ? "cursor-not-allowed opacity-60 hover:translate-y-0" : ""
        }`}
      >
        {status === "sending" ? (
          <>
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4 animate-spin"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M12 3a9 9 0 1 0 9 9" />
            </svg>
            Enviando…
          </>
        ) : (
          "Solicitar acceso"
        )}
      </button>

      {status === "error" && serverError && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="mt-4 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700"
        >
          <p className="font-semibold">{serverError}</p>
          <p className="mt-1">
            También puedes escribirnos a{" "}
            <a className="font-semibold underline" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>{" "}
            o por{" "}
            <a
              className="font-semibold underline"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            .
          </p>
        </div>
      )}

      <p className="mt-4 text-center text-xs text-ink-faint">
        Los campos marcados con * son obligatorios. Usamos tus datos solo para
        responder esta solicitud.
      </p>
    </form>
  );
}
