import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad — MyFix",
  description:
    "Cómo MyFix trata los datos que compartes al solicitar acceso desde este sitio.",
  alternates: { canonical: "/privacidad" },
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container-page max-w-3xl py-14 sm:py-20">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Política de privacidad
          </h1>
          <p className="mt-3 text-sm text-ink-faint">
            Última actualización: julio de 2026
          </p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft">
            <p>
              Esta página describe qué datos recoge este sitio web y para qué se
              usan. Aplica al formulario de solicitud de acceso de{" "}
              {SITE.name}.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Qué datos recogemos
            </h2>
            <p>
              Al enviar el formulario compartes: tu nombre, el nombre de tu
              empresa o negocio, un teléfono o WhatsApp de contacto, tu correo,
              tu país, el tipo de negocio y tu principal problema operativo.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Para qué los usamos
            </h2>
            <p>
              Únicamente para evaluar tu solicitud de acceso y ponernos en
              contacto contigo. No vendemos tus datos ni los compartimos con
              terceros para publicidad.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Dónde se almacenan
            </h2>
            <p>
              Las solicitudes se envían a través de un servicio de
              procesamiento de formularios al buzón de contacto de MyFix
              ({SITE.email}). Este sitio no usa cookies de seguimiento ni carga
              herramientas de analítica de terceros.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Tus derechos
            </h2>
            <p>
              Puedes pedir en cualquier momento que corrijamos o eliminemos tus
              datos escribiendo a{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-semibold text-violet-deep underline decoration-violet/40 underline-offset-2"
              >
                {SITE.email}
              </a>
              .
            </p>

            <p>
              <Link
                href="/"
                className="font-semibold text-violet-deep underline decoration-violet/40 underline-offset-2"
              >
                ← Volver al inicio
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
