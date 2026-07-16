/**
 * Configuración central del sitio. Los datos de contacto provienen del
 * canal real de MyFix (mismos valores que la web anterior en `../myfix`).
 */
export const SITE = {
  name: "MyFix",
  shortDescription:
    "El equipo empresarial de IA que convierte conversaciones, comprobantes y datos dispersos de una MYPE en decisiones y operaciones trazables.",
  tagline: "Inteligencia invisible. Control visible.",
  email: "myfixperu@gmail.com",
  /** Formato internacional sin "+" ni espacios. */
  whatsapp: "13058703539",
  whatsappDisplay: "+1 (305) 870-3539",
  location: "Lima, Perú",
  /** URL pública del sitio; configúrala en producción vía NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  /**
   * Endpoint de leads consumido DESDE EL NAVEGADOR. FormSubmit está detrás
   * de Cloudflare y bloquea envíos server-side desde IPs de datacenter
   * (Vercel), así que el formulario envía directo desde el navegador —el
   * mismo patrón probado de la web anterior. Configurable por entorno.
   */
  leadsEndpoint:
    process.env.NEXT_PUBLIC_LEADS_ENDPOINT ??
    "https://formsubmit.co/ajax/myfixperu@gmail.com",
} as const;

export const WHATSAPP_LINK = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hola MyFix, me gustaría recibir más información.",
)}`;

// Con prefijo "/" para que funcionen también desde /privacidad y /terminos.
export const NAV_ITEMS = [
  { label: "Producto", href: "/#producto" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Market", href: "/#market" },
  { label: "Seguridad", href: "/#seguridad" },
  { label: "Preguntas frecuentes", href: "/#faq" },
] as const;

/**
 * Rutas de los assets principales: la serie fotográfica "Usuarios en el
 * mundo real" de MyFix (1672×941 cada una).
 *
 * IMPORTANTE: al reemplazar un archivo por una versión nueva, sube el número
 * de `ASSET_VERSION`. Cambia la URL y obliga a navegadores y CDN a
 * re-descargar la imagen (si no, pueden seguir mostrando la copia cacheada).
 */
export const ASSET_VERSION = "?v=3";

export const ASSETS = {
  /** 01 · Bodega: dueña con su celular, sujeto a la derecha. */
  heroCover: `/assets/01-bodega-hero-control-visible.png${ASSET_VERSION}`,
  /** 03 · Restaurante: comprobantes y cuadernos al cierre del día. */
  fragmentedWorkflow: `/assets/03-restaurant-evidence-control.png${ASSET_VERSION}`,
  /** 02 · Panadería: verificación de una entrega de insumos. */
  procurementMoment: `/assets/02-bakery-procurement-verification.png${ASSET_VERSION}`,
  /** 06 · Tríptico: compradora y proveedores conectados por el Market. */
  agentCommerce: `/assets/06-market-network-triptych.png${ASSET_VERSION}`,
  /** Mockup: una conversación con el asistente y el panel del negocio detrás. */
  invisibleWorkforce: `/assets/01-myfix-cover-mype.png${ASSET_VERSION}`,
  /** 05 · Copropietarios: la aprobación es de las personas. */
  humanApproval: `/assets/05-coowners-human-approval.png${ASSET_VERSION}`,
} as const;
