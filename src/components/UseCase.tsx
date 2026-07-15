import Image from "next/image";
import CtaLink from "./CtaLink";
import Reveal from "./Reveal";
import { ASSETS } from "@/lib/site";

const SEQUENCE = [
  "MyFix estructura la necesidad",
  "Encuentra proveedores compatibles",
  "Normaliza las ofertas",
  "Compara precio, entrega, riesgo e impacto en caja",
  "Recomienda alternativas",
  "El empresario decide",
  "MyFix da seguimiento al resultado",
] as const;

export default function UseCase() {
  return (
    <section
      id="caso-compras"
      className="bg-white py-16 sm:py-24"
      aria-labelledby="caso-compras-titulo"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Caso de uso: compras</p>
          <h2 id="caso-compras-titulo" className="section-title mt-3 max-w-3xl">
            De “necesito comprar” a una operación comparable y aprobada.
          </h2>
          <p className="section-lead">
            Una compra empieza como un mensaje y termina como una decisión con
            alternativas comparadas, evidencia y seguimiento.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <figure>
            <Image
              src={ASSETS.procurementMoment}
              alt="Dueña de una panadería verifica en su celular la entrega de sacos de harina junto a su proveedor"
              width={1672}
              height={941}
              sizes="(min-width: 1024px) 72rem, 100vw"
              className="w-full rounded-2xl border border-line object-cover"
            />
          </figure>
        </Reveal>

        <Reveal className="mt-10">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7 lg:gap-2">
            {SEQUENCE.map((step, index) => (
              <li
                key={step}
                className="flex items-start gap-3 rounded-xl border border-line bg-mist/60 p-4 lg:flex-col lg:gap-2"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-extrabold text-violet-deep"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium leading-snug text-ink">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-8">
            <CtaLink
              href="#solicitar-acceso"
              event="procurement_cta_click"
              variant="secondary"
            >
              Ver cómo compraría con MyFix
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
