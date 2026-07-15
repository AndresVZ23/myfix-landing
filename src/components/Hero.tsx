import Image from "next/image";
import CtaLink from "./CtaLink";
import { ASSETS } from "@/lib/site";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="bg-mist bg-[radial-gradient(52rem_30rem_at_85%_-10%,rgba(234,228,255,0.9),transparent_65%)]"
    >
      <div className="container-page grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <div>
          <p className="eyebrow">El equipo empresarial de IA para las MYPEs</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl">
            El trabajo de tu negocio ya ocurre por WhatsApp. Ahora también puede
            convertirse en{" "}
            <span className="text-accent-gradient">control y mejores decisiones.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
            MyFix organiza comprobantes, compras, ventas y compromisos; prepara
            el trabajo y te pide aprobación antes de actuar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CtaLink href="#solicitar-acceso" event="hero_primary_cta_click">
              Quiero probar MyFix
            </CtaLink>
            <CtaLink
              href="#como-funciona"
              event="hero_secondary_cta_click"
              variant="secondary"
            >
              Ver cómo funciona
            </CtaLink>
          </div>
          <p className="mt-5 text-sm text-ink-faint">
            Acceso inicial para empresas seleccionadas. Sin compromisos
            automáticos.
          </p>
        </div>

        <figure className="relative">
          <Image
            src={ASSETS.heroCover}
            alt="Dueña de una bodega revisa su celular con tranquilidad mientras recibe a un proveedor de frutas"
            width={1672}
            height={941}
            preload
            sizes="(min-width: 72rem) 31rem, (min-width: 1024px) 45vw, 100vw"
            className="w-full rounded-2xl border border-line object-cover shadow-[0_24px_60px_-30px_rgba(11,4,37,0.45)]"
          />
        </figure>
      </div>
    </section>
  );
}
