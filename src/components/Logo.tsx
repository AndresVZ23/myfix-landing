import Image from "next/image";

/**
 * Marca oficial de MyFix. `onDark` cambia a la variante para fondos oscuros.
 * Los archivos provienen de `scripts/generate-logos.mjs` (derivados
 * recortados de los originales `logo_fondo_*.png`).
 */
export default function Logo({ onDark = false }: { onDark?: boolean }) {
  return onDark ? (
    <Image
      src="/assets/logo-on-dark.png"
      alt="MyFix"
      width={1887}
      height={543}
      className="h-8 w-auto"
    />
  ) : (
    <Image
      src="/assets/logo-on-light.png"
      alt="MyFix"
      width={1889}
      height={552}
      className="h-8 w-auto drop-shadow-[0_0.5px_1px_rgba(11,4,37,0.45)]"
    />
  );
}
