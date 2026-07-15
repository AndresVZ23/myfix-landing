import Image from "next/image";
import Reveal from "./Reveal";
import { ASSETS } from "@/lib/site";

const REPORT_URL =
  "https://www.comexperu.org.pe/upload/articles/reportes/reporte-mypes-2024.pdf";

export default function Problem() {
  return (
    <section id="problema" className="bg-white py-16 sm:py-24" aria-labelledby="problema-titulo">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">El problema</p>
          <h2 id="problema-titulo" className="section-title mt-3 max-w-3xl">
            Tu negocio genera información todos los días, pero permanece
            dispersa.
          </h2>
          <p className="section-lead">
            Mensajes, fotografías, facturas, boletas, bancos, Excel y apuntes
            contienen la historia financiera y operativa del negocio. El
            problema es convertirla a tiempo en decisiones.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <figure className="relative overflow-hidden rounded-2xl border border-line">
            <Image
              src={ASSETS.fragmentedWorkflow}
              alt="Dueña de un restaurante al cierre del día, con comprobantes en una bandeja y cuadernos de apuntes sobre la mesa"
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="w-full object-cover"
            />
            <figcaption className="bg-ink p-6 text-mist sm:absolute sm:inset-y-0 sm:right-0 sm:flex sm:w-[44%] sm:flex-col sm:justify-center sm:bg-ink/85 sm:p-8 sm:backdrop-blur-sm">
              <span className="font-display text-lg font-bold leading-snug text-white">
                La historia de tu negocio ya existe. Solo está repartida en diez
                lugares distintos.
              </span>
              <span className="mt-3 block text-sm leading-relaxed text-mist/80">
                Cada boleta fotografiada, cada pedido por chat y cada apunte en
                cuaderno es información que hoy nadie convierte en decisiones.
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal className="mt-10">
          <div className="card grid gap-6 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:p-8">
            <p className="font-display text-6xl font-extrabold tracking-tight text-accent-gradient sm:text-7xl">
              3,7%
            </p>
            <div>
              <p className="text-lg font-semibold leading-snug text-ink">
                Solo 3,7% de las MYPEs peruanas lleva libros contables o cuenta
                con un sistema completo de contabilidad.
              </p>
              <p className="mt-2 text-sm text-ink-soft">
                Fuente:{" "}
                <a
                  href={REPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-violet-deep underline decoration-violet/40 underline-offset-4 transition hover:decoration-violet"
                >
                  COMEX Perú, con datos de ENAHO 2024
                </a>
                . El resto opera sin un sistema completo: 76,5% no lleva
                registros y 19,8% usa apuntes personales (mismo reporte).
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
