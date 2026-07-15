import Reveal from "./Reveal";
import StatusChip from "./StatusChip";
import TrackView from "./TrackView";

const STEPS = [
  {
    title: "Comparte la evidencia",
    text: "Fotografías, mensajes, documentos, ventas, compras o inventario.",
  },
  {
    title: "MyFix crea contexto",
    text: "Estructura la información y la conecta con la memoria de la empresa.",
  },
  {
    title: "Los agentes preparan el trabajo",
    text: "Analizan, comparan, detectan riesgos y proponen acciones.",
  },
  {
    title: "Tú revisas y apruebas",
    text: "Las acciones sensibles requieren decisión humana y quedan registradas.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="bg-mist py-16 sm:py-24"
      aria-labelledby="como-funciona-titulo"
    >
      <TrackView event="how_it_works_view">
        <div className="container-page">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Cómo funciona</p>
              <StatusChip status="En piloto" />
            </div>
            <h2 id="como-funciona-titulo" className="section-title mt-3 max-w-3xl">
              Una conversación se convierte en trabajo empresarial.
            </h2>
          </Reveal>

          <ol className="mt-12 grid gap-4 md:grid-cols-4 md:gap-6">
            {STEPS.map((step, index) => (
              <Reveal as="li" key={step.title} className="relative">
                <div className="card h-full">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-violet-deep font-display text-sm font-extrabold text-white"
                  >
                    {index + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </TrackView>
    </section>
  );
}
