const STATUS_STYLES = {
  "Disponible hoy": "border-teal-deep/30 bg-teal/10 text-teal-deep",
  "En piloto": "border-violet/30 bg-lavender/60 text-violet-deep",
  Próximamente: "border-signal/30 bg-signal/10 text-[#1259c9]",
  Visión: "border-ink/15 bg-mist text-ink-soft",
} as const;

export type Status = keyof typeof STATUS_STYLES;

/** Etiqueta que diferencia el estado real de cada capacidad. */
export default function StatusChip({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-display text-xs font-bold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
