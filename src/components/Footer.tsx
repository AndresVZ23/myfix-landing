import Link from "next/link";
import Logo from "./Logo";
import { SITE, WHATSAPP_LINK } from "@/lib/site";

// Con prefijo "/" para que funcionen también desde /privacidad y /terminos.
const PRODUCT_LINKS = [
  { label: "Producto", href: "/#producto" },
  { label: "Cómo funciona", href: "/#como-funciona" },
  { label: "Market", href: "/#market" },
  { label: "Seguridad", href: "/#seguridad" },
] as const;

const LEGAL_LINKS = [
  { label: "Privacidad", href: "/privacidad" },
  { label: "Términos", href: "/terminos" },
] as const;

export default function Footer() {
  return (
    <footer className="bg-ink text-mist/80">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
        <div>
          <Link href="/#inicio" aria-label="MyFix — volver al inicio" className="inline-block">
            <Logo onDark />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {SITE.shortDescription}
          </p>
          <p className="mt-4 font-display text-sm font-bold text-lavender">
            {SITE.tagline}
          </p>
        </div>

        <nav aria-label="Producto">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Producto
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {PRODUCT_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Legal
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-white">
            Contacto
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${SITE.email}`} className="transition hover:text-white">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp {SITE.whatsappDisplay}
              </a>
            </li>
            <li>{SITE.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-mist/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} MyFix. Todos los derechos reservados.</p>
          <p>Hecho para las MYPEs de Perú y Latinoamérica.</p>
        </div>
      </div>
    </footer>
  );
}
