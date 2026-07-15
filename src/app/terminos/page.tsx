import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos de uso — MyFix",
  description: "Condiciones de uso de este sitio web de MyFix.",
  alternates: { canonical: "/terminos" },
};

export default function TerminosPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <div className="container-page max-w-3xl py-14 sm:py-20">
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            Términos de uso
          </h1>
          <p className="mt-3 text-sm text-ink-faint">
            Última actualización: julio de 2026
          </p>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-ink-soft">
            <p>
              Este sitio presenta {SITE.name} y permite solicitar acceso al
              programa inicial del producto. Al usarlo aceptas estas
              condiciones.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Carácter informativo
            </h2>
            <p>
              El contenido de este sitio es informativo y describe el estado
              actual y la dirección del producto. Las capacidades marcadas como
              “En piloto”, “Próximamente” o “Visión” pueden cambiar durante el
              desarrollo.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Solicitud de acceso
            </h2>
            <p>
              Enviar el formulario no crea una relación contractual ni
              compromisos automáticos: es una solicitud para participar en el
              acceso inicial, que MyFix evalúa caso por caso.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Sin asesoría profesional
            </h2>
            <p>
              La información de este sitio no constituye asesoría contable,
              tributaria, legal ni financiera. Para decisiones de ese tipo,
              consulta a un profesional.
            </p>

            <h2 className="font-display text-xl font-bold text-ink">
              Contacto
            </h2>
            <p>
              Ante cualquier duda sobre estos términos escríbenos a{" "}
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
