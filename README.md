# MyFix — Landing page

Landing page de **MyFix**, el equipo empresarial de IA para las MYPEs de Perú
y Latinoamérica. Principio de marca: **“Inteligencia invisible. Control
visible.”**

## Stack

- **Next.js 16** (App Router, Server Components, Turbopack)
- **React 19** + **TypeScript estricto**
- **Tailwind CSS 4** (tokens de la paleta oficial en `src/app/globals.css`)
- **next/font** con Manrope (títulos) e Inter (cuerpo), auto-alojadas
- Sin dependencias de UI externas; formulario y acordeones con HTML nativo

## Comandos

```bash
npm install                  # dependencias
npm run dev                  # desarrollo (http://localhost:3000)
npm run lint                 # ESLint
npm run typecheck            # tsc --noEmit
npm run test                 # pruebas de validación de leads (node:test)
npm run build                # build de producción
npm run start                # servir el build
npm run assets:placeholders  # regenerar los placeholders de public/assets
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

| Variable | Uso |
| --- | --- |
| `LEADS_WEBHOOK_URL` | Webhook que recibe las solicitudes del formulario (POST JSON). El buzón actual de MyFix es FormSubmit: `https://formsubmit.co/ajax/myfixperu@gmail.com`. **Sin esta variable la API responde 503 y el formulario muestra un error claro (nunca simula éxito).** |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio; alimenta metadata, Open Graph, `robots.txt` y `sitemap.xml`. Obligatoria en producción. |

> **FormSubmit**: la primera solicitud dispara un correo de activación a
> `myfixperu@gmail.com`; hay que hacer clic en “Activate Form” una sola vez.

## Formulario de leads

- Cliente: `src/components/LeadForm.tsx` (estados `loading/success/error`,
  errores por campo, honeypot anti-spam, foco gestionado).
- API: `src/app/api/leads/route.ts` — valida con `src/lib/leads.ts` y reenvía
  al webhook. No registra datos personales en logs.
- La validación es la misma en cliente y servidor (`validateLead`).

> **FormSubmit (importante)**: al enviarse desde el servidor, la API añade
> `Origin`/`Referer` con `NEXT_PUBLIC_SITE_URL` (FormSubmit rechaza peticiones
> sin origen de navegador) y **verifica el campo `success`** de la respuesta,
> no solo el status HTTP: FormSubmit responde 200 aunque rechace. La **primera
> vez** hay que abrir el correo de activación en `myfixperu@gmail.com` y hacer
> clic en **"Activate Form"**; hasta entonces la API responde 502 con un aviso
> claro (nunca finge éxito). La activación queda ligada al `Origin`, así que
> repite el clic tras cambiar de dominio (localhost → producción).

## Imágenes

La página usa la serie fotográfica **"MyFix · Usuarios en el mundo real"**
(`public/assets/`, 1672×941), asignada así:

| Sección | Archivo |
| --- | --- |
| Hero | `01-bodega-hero-control-visible.png` |
| El problema | `03-restaurant-evidence-control.png` |
| Caso de uso: compras | `02-bakery-procurement-verification.png` |
| Equipo de agentes | `01-myfix-cover-mype.png` (mockup asistente + panel) |
| Market y red | `06-market-network-triptych.png` |
| Control y confianza | `05-coowners-human-approval.png` |

Las rutas están centralizadas en `ASSETS` (`src/lib/site.ts`). Tras
reemplazar un archivo, **sube el número de `ASSET_VERSION`** en ese mismo
módulo y vuelve a compilar: cambia las URLs y evita que navegadores o CDN
sigan mostrando la imagen anterior cacheada (la config de
`images.localPatterns` en `next.config.ts` se sincroniza sola).

Los mockups de producto (`MyFix_Dashboard.jpeg`, `my_fix_girl_dashboard.jpeg`,
etc.) están en `public/assets/` pero **no se usan en la página**: muestran
métricas e interfaces que el producto aún no tiene y el criterio de
credibilidad de la landing evita aparentar funcionalidades inexistentes.

### Logos (ya definitivos)

Los logos oficiales viven en `public/assets/`: `logo_fondo_blanco.PNG`
(fondos claros) y `logo_fondo_oscuro.png` (fondos oscuros). El script
`node scripts/generate-logos.mjs` genera a partir de ellos los derivados que
usa el sitio — `logo-on-light.png` (header), `logo-on-dark.png` (footer) y
`og.png` (imagen Open Graph 1200×630) — sin modificar los originales. Si se
reemplazan los originales, vuelve a ejecutar ese script.

## Analítica

No se carga ningún script de analytics (no hay configuración real ni
consentimiento). Los eventos recomendados ya están instrumentados en
`src/lib/track.ts` y se envían a `window.dataLayer` **solo si existe** (p. ej.
si más adelante se integra GTM con banner de consentimiento):
`hero_primary_cta_click`, `hero_secondary_cta_click`, `how_it_works_view`,
`procurement_cta_click`, `lead_form_start`, `lead_form_submit`,
`lead_form_success`, `lead_form_error`.

## Credibilidad

- Único dato de mercado citado: 3,7% de MYPEs con contabilidad completa
  (COMEX Perú / ENAHO 2024, enlazado en la sección del problema), acompañado
  del desglose del mismo reporte (76,5% sin registros, 19,8% con apuntes).
- Estados diferenciados con `StatusChip`: “En piloto” / “Visión”
  (también existen “Disponible hoy” y “Próximamente”).
- Sin testimonios, logos de clientes ni métricas de tracción inventadas.
- El comercio agente-a-agente se presenta explícitamente como visión.
