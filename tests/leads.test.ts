import assert from "node:assert/strict";
import { test } from "node:test";
import { buildWebhookPayload, validateLead, type Lead } from "../src/lib/leads";

const VALID_BODY = {
  name: "María Fernández",
  company: "Ferretería San Martín",
  phone: "+51 987 654 321",
  email: "maria@ferreteria.pe",
  country: "PE",
  businessType: "Comercio / bodega",
  mainProblem: "Compras y proveedores",
  consent: true,
};

test("acepta una solicitud válida y recorta espacios", () => {
  const result = validateLead({ ...VALID_BODY, name: "  María Fernández  " });
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.lead.name, "María Fernández");
    assert.equal(result.lead.country, "PE");
    assert.equal(result.lead.consent, true);
  }
});

test("rechaza un cuerpo que no es objeto", () => {
  for (const body of [null, undefined, "hola", 42, []]) {
    const result = validateLead(body);
    assert.equal(result.ok, false);
  }
});

test("exige todos los campos obligatorios", () => {
  const result = validateLead({});
  assert.equal(result.ok, false);
  if (!result.ok) {
    for (const field of [
      "name",
      "company",
      "phone",
      "email",
      "country",
      "businessType",
      "mainProblem",
      "consent",
    ] as const) {
      assert.ok(result.errors[field], `falta error para ${field}`);
    }
  }
});

test("rechaza correos inválidos", () => {
  for (const email of ["sin-arroba", "a@b", "a @b.com", "a@b.c"]) {
    const result = validateLead({ ...VALID_BODY, email });
    assert.equal(result.ok, false, `debió rechazar: ${email}`);
    if (!result.ok) assert.ok(result.errors.email);
  }
});

test("acepta nombres con letras de otros idiomas y de 2 caracteres", () => {
  for (const name of ["João Souza", "Ñu Pérez", "Al"]) {
    const result = validateLead({ ...VALID_BODY, name });
    assert.equal(result.ok, true, `debió aceptar: ${name}`);
  }
});

test("rechaza teléfonos inválidos", () => {
  for (const phone of ["123", "abcdef", "+51-abc-999", "() --- ()", "+51 999 888 777 666 555"]) {
    const result = validateLead({ ...VALID_BODY, phone });
    assert.equal(result.ok, false, `debió rechazar: ${phone}`);
    if (!result.ok) assert.ok(result.errors.phone);
  }
});

test("rechaza país, tipo de negocio o problema fuera de catálogo", () => {
  for (const patch of [
    { country: "XX" },
    { businessType: "Minería ilegal" },
    { mainProblem: "Nada" },
  ]) {
    const result = validateLead({ ...VALID_BODY, ...patch });
    assert.equal(result.ok, false);
  }
});

test("exige consentimiento explícito (true booleano)", () => {
  for (const consent of [false, "on", "true", 1, undefined]) {
    const result = validateLead({ ...VALID_BODY, consent });
    assert.equal(result.ok, false);
    if (!result.ok) assert.ok(result.errors.consent);
  }
});

test("el payload para FormSubmit incluye sus claves de configuración", () => {
  const result = validateLead(VALID_BODY);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const lead: Lead = result.lead;

  const formSubmit = buildWebhookPayload(
    lead,
    "https://formsubmit.co/ajax/myfixperu@gmail.com",
  );
  assert.equal(formSubmit._template, "table");
  assert.equal(formSubmit._replyto, lead.email);
  assert.equal(formSubmit["País"], "Perú");

  const generic = buildWebhookPayload(lead, "https://example.com/webhook");
  assert.equal(generic._template, undefined);
  assert.equal(generic["Nombre"], lead.name);
  assert.equal(generic["Tipo de negocio"], lead.businessType);
});

test("una URL de webhook inválida no rompe el payload", () => {
  const result = validateLead(VALID_BODY);
  assert.equal(result.ok, true);
  if (!result.ok) return;
  const payload = buildWebhookPayload(result.lead, "no-es-una-url");
  assert.equal(payload._template, undefined);
  assert.equal(payload["Correo"], result.lead.email);
});
