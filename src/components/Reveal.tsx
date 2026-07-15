"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Animación de entrada discreta al hacer scroll.
 *
 * El contenido es visible por defecto (SEO y sin-JS incluidos): solo se
 * oculta con JS activo, cuando el elemento está bajo el fold y el usuario
 * no pide `prefers-reduced-motion`. Así nunca puede quedar contenido
 * invisible de forma permanente.
 */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "li" | "figure";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    // Solo animar lo que aún no se ve; lo visible se queda como está.
    const rect = element.getBoundingClientRect();
    if (rect.top >= window.innerHeight * 0.9) {
      element.classList.add("reveal-hidden");
    } else {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            element.classList.add("reveal-in");
            element.classList.remove("reveal-hidden");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref as never} className={className || undefined}>
      {children}
    </Tag>
  );
}
