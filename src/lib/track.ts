/**
 * Eventos de analítica recomendados. No se carga ningún script de
 * analytics: los eventos solo se envían si el sitio se despliega con un
 * gestor que exponga `window.dataLayer` (p. ej. GTM con consentimiento).
 * Sin esa configuración, `track` no hace nada en producción.
 */
export type TrackEvent =
  | "hero_primary_cta_click"
  | "hero_secondary_cta_click"
  | "how_it_works_view"
  | "procurement_cta_click"
  | "lead_form_start"
  | "lead_form_submit"
  | "lead_form_success"
  | "lead_form_error"
  | "whatsapp_float_click";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(
  event: TrackEvent,
  props?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined") return;
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...props });
  } else if (process.env.NODE_ENV === "development") {
    console.debug("[track]", event, props ?? {});
  }
}
