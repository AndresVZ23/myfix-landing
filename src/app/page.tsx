import Agents from "@/components/Agents";
import Faq from "@/components/Faq";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Market from "@/components/Market";
import Problem from "@/components/Problem";
import Trust from "@/components/Trust";
import UseCase from "@/components/UseCase";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-bold focus:text-ink focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" className="flex-1">
        <Hero />
        <Problem />
        <HowItWorks />
        <UseCase />
        <Agents />
        <Market />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
