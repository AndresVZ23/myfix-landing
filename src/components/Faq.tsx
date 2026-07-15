import Reveal from "./Reveal";

const FAQS = [
  {
    question: "¿MyFix actúa sin mi permiso?",
    answer:
      "No. Las acciones sensibles —pagos, pedidos, compromisos con terceros— requieren tu aprobación explícita. MyFix observa, prepara y propone; tú decides, y cada acción queda registrada.",
  },
  {
    question: "¿Necesito aprender a usar un ERP?",
    answer:
      "No. Conversas con MyFix igual que conversas por WhatsApp. La estructura —registros, categorías, historial— se construye detrás, sin que tengas que aprender un sistema nuevo.",
  },
  {
    question: "¿El Market tiene resultados patrocinados?",
    answer:
      "No. No existe ranking pagado. Los resultados se ordenan por compatibilidad con tu necesidad. La suscripción desbloquea análisis avanzado, no mejores posiciones.",
  },
  {
    question: "¿MyFix reemplaza a mi contador?",
    answer:
      "No. MyFix organiza la información y prepara el trabajo para que tú y tu contador decidan con mejores datos. No presenta declaraciones tributarias finales ni sustituye asesoría profesional.",
  },
  {
    question: "¿Qué información puede recibir por WhatsApp?",
    answer:
      "Fotografías de boletas y facturas, mensajes sobre ventas, compras, pedidos o gastos, documentos y datos de inventario. MyFix los estructura y los conecta con la memoria de tu empresa.",
  },
  {
    question: "¿Cómo se protegen los datos de mi empresa?",
    answer:
      "El diseño de MyFix parte de tres reglas: la información de cada empresa se mantiene aislada, cada usuario tiene permisos propios y toda acción queda registrada. Durante el piloto te explicamos en detalle cómo se aplica a tu caso.",
  },
  {
    question: "¿Qué consume créditos de MyFix?",
    answer:
      "El trabajo de los agentes: análisis, matching avanzado, comparación de ofertas y seguimiento. Crear tu perfil, publicar en el Market y buscar manualmente no consumen créditos de IA.",
  },
] as const;

export default function Faq() {
  return (
    <section id="faq" className="bg-white py-16 sm:py-24" aria-labelledby="faq-titulo">
      <div className="container-page max-w-3xl">
        <Reveal>
          <p className="eyebrow">Preguntas frecuentes</p>
          <h2 id="faq-titulo" className="section-title mt-3">
            Respuestas directas, sin letra pequeña.
          </h2>
        </Reveal>

        <Reveal className="mt-8">
          <div className="divide-y divide-line rounded-2xl border border-line bg-white">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group p-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 font-display text-base font-bold text-ink transition hover:bg-mist [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <svg
                    viewBox="0 0 20 20"
                    className="h-5 w-5 shrink-0 text-violet-deep transition group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M10 4v12M4 10h12" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
