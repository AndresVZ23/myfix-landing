import Image from "next/image";
import Reveal from "./Reveal";
import StatusChip from "./StatusChip";
import { ASSETS } from "@/lib/site";

const OPEN_FEATURES = [
  "Cualquier empresa puede crear su perfil.",
  "Los proveedores pueden publicar productos y capacidad.",
  "Los compradores pueden buscar manualmente.",
  "No existe ranking pagado.",
  "El acceso básico no consume créditos de IA.",
] as const;

export default function Market() {
  return (
    <section
      id="market"
      className="bg-white py-16 sm:py-24"
      aria-labelledby="market-titulo"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Market y red</p>
          <h2 id="market-titulo" className="section-title mt-3 max-w-3xl">
            El Market es abierto. Los agentes hacen el trabajo avanzado.
          </h2>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-lg font-bold text-ink">
                Acceso abierto
              </h3>
              <StatusChip status="En piloto" />
            </div>
            <ul className="mt-4 space-y-3">
              {OPEN_FEATURES.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 20 20"
                    className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  <span className="text-sm leading-relaxed text-ink-soft sm:text-base">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-line bg-mist/70 p-5">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-base font-bold text-ink">
                  Con suscripción
                </h3>
                <StatusChip status="En piloto" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Desbloquea matching avanzado, análisis de ofertas, negociación
                asistida y seguimiento de cada operación.
              </p>
            </div>

            <div className="mt-6 rounded-xl border border-dashed border-ink/20 p-5">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-base font-bold text-ink">
                  Comercio agente a agente
                </h3>
                <StatusChip status="Visión" />
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Que el agente de tu empresa converse con el agente de tu
                proveedor para preparar operaciones completas es la dirección
                del producto. Cuando exista, cada acuerdo seguirá pasando por
                aprobación humana.
              </p>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-ink-faint">
              <strong className="font-semibold text-ink-soft">En piloto:</strong>{" "}
              disponible para las empresas del programa inicial.{" "}
              <strong className="font-semibold text-ink-soft">Visión:</strong>{" "}
              en diseño, todavía no disponible.
            </p>
          </Reveal>

          <Reveal className="order-1 lg:order-2">
            <figure>
              <Image
                src={ASSETS.agentCommerce}
                alt="Tres escenas de una misma operación: una compradora consulta su celular, negocia con sus proveedores y cierran el acuerdo en el mostrador"
                width={1672}
                height={941}
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="w-full rounded-2xl border border-line object-cover"
              />
              <figcaption className="mt-3 flex flex-wrap items-center gap-2 text-sm text-ink-soft">
                <span className="rounded-full bg-lavender px-3 py-1 font-medium text-violet-deep">
                  Los agentes preparan
                </span>
                <span aria-hidden="true">→</span>
                <span className="rounded-full bg-teal/10 px-3 py-1 font-medium text-teal-deep">
                  Las personas aprueban
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
