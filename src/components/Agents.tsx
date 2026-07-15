import Image from "next/image";
import Reveal from "./Reveal";
import StatusChip from "./StatusChip";
import { ASSETS } from "@/lib/site";

const AGENT_ROLES = [
  { name: "Market", text: "Búsqueda, matching y ofertas." },
  { name: "Finanzas", text: "Caja, cobros, pagos y proyecciones." },
  { name: "Impuestos", text: "Clasificación, reservas y alertas." },
  { name: "Controller", text: "Conciliación e inconsistencias." },
  { name: "Operaciones", text: "Pedidos, inventarios y entregas." },
  { name: "Compliance", text: "Permisos, evidencia y políticas." },
  { name: "Growth", text: "Oportunidades, recurrencia y clientes." },
] as const;

export default function Agents() {
  return (
    <section
      id="producto"
      className="bg-mist py-16 sm:py-24"
      aria-labelledby="producto-titulo"
    >
      <div className="container-page">
        <Reveal>
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">El producto</p>
            <StatusChip status="En piloto" />
          </div>
          <h2 id="producto-titulo" className="section-title mt-3 max-w-3xl">
            Un solo asistente. Un equipo trabajando detrás.
          </h2>
          <p className="section-lead">
            El usuario conversa con MyFix. Los agentes especializados colaboran
            sobre la misma memoria empresarial, evidencia y permisos.
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal>
            <figure>
              <Image
                src={ASSETS.invisibleWorkforce}
                alt="Persona conversa con el asistente de MyFix desde su celular mientras el panel del negocio muestra el trabajo preparado detrás"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 36rem, 100vw"
                className="w-full rounded-2xl border border-line object-cover"
              />
            </figure>
          </Reveal>

          <Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {AGENT_ROLES.map((role) => (
                <li
                  key={role.name}
                  className="rounded-xl border border-line bg-white p-4"
                >
                  <h3 className="font-display text-base font-bold text-ink">
                    {role.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {role.text}
                  </p>
                </li>
              ))}
              <li className="rounded-xl border border-dashed border-violet/35 bg-lavender/40 p-4">
                <h3 className="font-display text-base font-bold text-violet-deep">
                  Una sola conversación
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  No manejas siete herramientas: hablas con MyFix y el equipo
                  trabaja detrás, con tus permisos.
                </p>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
