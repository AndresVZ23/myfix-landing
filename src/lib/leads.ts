/**
 * Tipos y validación del formulario de solicitud de acceso.
 * Este módulo no depende de Next.js ni del DOM para poder probarse
 * de forma aislada con `node:test` (ver `tests/leads.test.ts`).
 */

export const LEAD_COUNTRIES = [
  { code: "PE", name: "Perú", dial: "+51" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "BO", name: "Bolivia", dial: "+591" },
  { code: "BR", name: "Brasil", dial: "+55" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "CR", name: "Costa Rica", dial: "+506" },
  { code: "EC", name: "Ecuador", dial: "+593" },
  { code: "SV", name: "El Salvador", dial: "+503" },
  { code: "US", name: "Estados Unidos", dial: "+1" },
  { code: "GT", name: "Guatemala", dial: "+502" },
  { code: "HN", name: "Honduras", dial: "+504" },
  { code: "MX", name: "México", dial: "+52" },
  { code: "NI", name: "Nicaragua", dial: "+505" },
  { code: "PA", name: "Panamá", dial: "+507" },
  { code: "PY", name: "Paraguay", dial: "+595" },
  { code: "DO", name: "República Dominicana", dial: "+1" },
  { code: "UY", name: "Uruguay", dial: "+598" },
  { code: "VE", name: "Venezuela", dial: "+58" },
  { code: "OT", name: "Otro país", dial: "" },
] as const;

export type CountryCode = (typeof LEAD_COUNTRIES)[number]["code"];

export const BUSINESS_TYPES = [
  "Comercio / bodega",
  "Restaurante / alimentos",
  "Servicios profesionales",
  "Manufactura / taller",
  "Construcción / ferretería",
  "Transporte / logística",
  "Agro",
  "Otro",
] as const;

export type BusinessType = (typeof BUSINESS_TYPES)[number];

export const MAIN_PROBLEMS = [
  "Comprobantes y registros dispersos",
  "Caja, cobros y pagos",
  "Compras y proveedores",
  "Inventario y pedidos",
  "Impuestos y SUNAT",
  "Encontrar nuevos clientes",
  "Otro",
] as const;

export type MainProblem = (typeof MAIN_PROBLEMS)[number];

export interface Lead {
  name: string;
  company: string;
  phone: string;
  email: string;
  country: CountryCode;
  businessType: BusinessType;
  mainProblem: MainProblem;
  consent: true;
}

export type LeadField = keyof Lead;
export type LeadErrors = Partial<Record<LeadField, string>>;

export type LeadValidation =
  | { ok: true; lead: Lead }
  | { ok: false; errors: LeadErrors };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// \p{L}\p{M}: letras de cualquier idioma con sus diacríticos (João, Nuñez…)
const NAME_REGEX = /^[\p{L}\p{M}'. -]{2,80}$/u;
const PHONE_REGEX = /^\+?[0-9 ()-]{6,20}$/;
const MIN_PHONE_DIGITS = 6;
const MAX_PHONE_DIGITS = 15;

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isCountryCode(value: string): value is CountryCode {
  return LEAD_COUNTRIES.some((c) => c.code === value);
}

function isBusinessType(value: string): value is BusinessType {
  return (BUSINESS_TYPES as readonly string[]).includes(value);
}

function isMainProblem(value: string): value is MainProblem {
  return (MAIN_PROBLEMS as readonly string[]).includes(value);
}

/** Valida un cuerpo desconocido (p. ej. JSON recibido por la API). */
export function validateLead(data: unknown): LeadValidation {
  const errors: LeadErrors = {};
  const body = (typeof data === "object" && data !== null ? data : {}) as Record<
    string,
    unknown
  >;

  const name = asTrimmedString(body.name);
  if (!name) errors.name = "El nombre es obligatorio.";
  else if (!NAME_REGEX.test(name))
    errors.name = "Ingresa un nombre válido (solo letras, de 2 a 80 caracteres).";

  const company = asTrimmedString(body.company);
  if (!company) errors.company = "El nombre de tu empresa o negocio es obligatorio.";
  else if (company.length > 120)
    errors.company = "El nombre de la empresa es demasiado largo.";

  const phone = asTrimmedString(body.phone);
  const phoneDigits = (phone.match(/\d/g) ?? []).length;
  if (!phone) errors.phone = "El teléfono o WhatsApp es obligatorio.";
  else if (
    !PHONE_REGEX.test(phone) ||
    phoneDigits < MIN_PHONE_DIGITS ||
    phoneDigits > MAX_PHONE_DIGITS
  )
    errors.phone = "Ingresa un número válido (de 6 a 15 dígitos).";

  const email = asTrimmedString(body.email);
  if (!email) errors.email = "El correo es obligatorio.";
  else if (email.length > 254 || !EMAIL_REGEX.test(email))
    errors.email = "Ingresa un correo válido (ej. nombre@empresa.com).";

  const country = asTrimmedString(body.country);
  if (!isCountryCode(country)) errors.country = "Selecciona tu país.";

  const businessType = asTrimmedString(body.businessType);
  if (!isBusinessType(businessType))
    errors.businessType = "Selecciona el tipo de negocio.";

  const mainProblem = asTrimmedString(body.mainProblem);
  if (!isMainProblem(mainProblem))
    errors.mainProblem = "Selecciona tu principal problema operativo.";

  if (body.consent !== true)
    errors.consent =
      "Debes aceptar el tratamiento de tus datos para enviar la solicitud.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      name,
      company,
      phone,
      email,
      country: country as CountryCode,
      businessType: businessType as BusinessType,
      mainProblem: mainProblem as MainProblem,
      consent: true,
    },
  };
}

/**
 * Payload que se envía al webhook de leads. Si el webhook es FormSubmit
 * (el buzón actual de MyFix), se incluyen sus claves de configuración;
 * para cualquier otro webhook son campos extra inofensivos.
 */
/** ¿El webhook es FormSubmit? (exige headers de origen y devuelve `success`). */
export function isFormSubmitUrl(webhookUrl: string): boolean {
  try {
    return new URL(webhookUrl).hostname.endsWith("formsubmit.co");
  } catch {
    return false;
  }
}

export function buildWebhookPayload(
  lead: Lead,
  webhookUrl: string,
): Record<string, string> {
  const country = LEAD_COUNTRIES.find((c) => c.code === lead.country);
  const base: Record<string, string> = {
    Nombre: lead.name,
    Empresa: lead.company,
    "Teléfono / WhatsApp": lead.phone,
    Correo: lead.email,
    País: country ? country.name : lead.country,
    "Tipo de negocio": lead.businessType,
    "Principal problema operativo": lead.mainProblem,
    "Acepta tratamiento de datos": "Sí",
    Origen: "Landing myfix_app",
  };

  if (isFormSubmitUrl(webhookUrl)) {
    return {
      _subject: `Nueva solicitud de acceso — ${lead.name} (${lead.company})`,
      _template: "table",
      _captcha: "false",
      _replyto: lead.email,
      ...base,
    };
  }
  return base;
}
