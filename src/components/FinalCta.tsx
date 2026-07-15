import LeadForm from "./LeadForm";
import Reveal from "./Reveal";

export default function FinalCta() {
  return (
    <section
      id="solicitar-acceso"
      className="bg-mist bg-[radial-gradient(46rem_26rem_at_12%_0%,rgba(234,228,255,0.9),transparent_60%)] py-16 sm:py-24"
      aria-labelledby="solicitar-titulo"
    >
      <div className="container-page grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <Reveal>
          <p className="eyebrow">Solicitar acceso</p>
          <h2 id="solicitar-titulo" className="section-title mt-3">
            Convierte la actividad diaria de tu negocio en decisiones que sí
            puedes usar.
          </h2>
          <p className="section-lead">
            Solicita acceso y descubre cómo MyFix puede ayudarte a organizar
            información, comparar alternativas y dar seguimiento al trabajo.
          </p>
          <ul className="mt-6 space-y-3 text-sm font-medium text-ink">
            {[
              "Acceso inicial para empresas seleccionadas",
              "Sin compromisos automáticos",
              "Te respondemos por WhatsApp o correo",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lavender text-xs font-bold text-violet-deep"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
