import Image from "next/image";
import Reveal from "./Reveal";
import { ASSETS } from "@/lib/site";

const PIPELINE = [
  "Observa",
  "Recomienda",
  "Prepara",
  "Solicita aprobación",
  "Ejecuta dentro de límites",
  "Registra el resultado",
] as const;

const PRINCIPLES = [
  {
    title: "Evidencia y fuentes visibles",
    text: "Cada recomendación muestra de dónde sale la información.",
  },
  {
    title: "Aprobación humana",
    text: "Las acciones sensibles requieren tu decisión explícita.",
  },
  {
    title: "Límites de autonomía",
    text: "Los agentes solo actúan dentro de los límites que defines.",
  },
  {
    title: "Historial de acciones",
    text: "Lo que se hizo, quién lo aprobó y con qué evidencia queda registrado.",
  },
  {
    title: "Permisos por usuario",
    text: "Cada persona de tu equipo ve y aprueba solo lo que le corresponde.",
  },
  {
    title: "Aislamiento entre empresas",
    text: "La información de tu negocio no se mezcla con la de otros.",
  },
  {
    title: "Datos externos con desconfianza",
    text: "Lo que llega de terceros se trata como información no confiable hasta verificarse.",
  },
] as const;

const NOT_PROMISED = [
  "Transferencias automáticas de dinero",
  "Declaraciones tributarias finales",
  "Préstamos o custodia de fondos",
  "Compromisos jurídicos sin tu autorización",
] as const;

export default function Trust() {
  return (
    <section
      id="seguridad"
      className="bg-ink py-16 text-white sm:py-24"
      aria-labelledby="seguridad-titulo"
    >
      <div className="container-page">
        <Reveal>
          <p className="eyebrow text-lavender">Control y confianza</p>
          <h2 id="seguridad-titulo" className="section-title mt-3 max-w-3xl text-white">
            Los agentes trabajan. Tú conservas el control.
          </h2>
          <p className="section-lead text-mist/75">
            Así se diseña cada acción de MyFix, del primer análisis al registro
            final.
          </p>
        </Reveal>

        <Reveal className="mt-10">
          <ol className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
            {PIPELINE.map((stage, index) => (
              <li key={stage} className="flex items-center gap-2 lg:flex-1">
                <span className="flex min-h-16 w-full items-center justify-start rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold leading-snug lg:justify-center lg:text-center">
                  {stage}
                </span>
                {index < PIPELINE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="hidden px-1 text-mist/50 lg:block"
                  >
                    →
                  </span>
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Reveal>
            <h3 className="font-display text-lg font-bold text-white">
              Principios de diseño
            </h3>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {PRINCIPLES.map((principle) => (
                <li key={principle.title}>
                  <h4 className="font-display text-sm font-bold text-lavender">
                    {principle.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-mist/75">
                    {principle.text}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <figure>
              <Image
                src={ASSETS.humanApproval}
                alt="Dos copropietarios de una ferretería revisan juntos los documentos de una operación antes de aprobarla"
                width={1672}
                height={941}
                sizes="(min-width: 1024px) 26rem, 100vw"
                className="w-full rounded-2xl border border-white/15 object-cover"
              />
              <figcaption className="mt-3 text-sm text-mist/70">
                La aprobación final siempre es de las personas.
              </figcaption>
            </figure>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <h3 className="font-display text-lg font-bold text-white">
                Lo que MyFix no promete
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist/75">
                Preferimos límites claros antes que promesas grandes.
              </p>
              <ul className="mt-4 space-y-3">
                {NOT_PROMISED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-mist/85">
                    <svg
                      viewBox="0 0 20 20"
                      className="mt-0.5 h-4 w-4 shrink-0 text-orchid"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      aria-hidden="true"
                    >
                      <path d="M5 5l10 10M15 5L5 15" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
