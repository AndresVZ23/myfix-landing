"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/track";

/** Enlace de llamada a la acción que registra su evento de analítica. */
export default function CtaLink({
  href,
  event,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  event: TrackEvent;
  variant?: "primary" | "secondary" | "onDark";
  className?: string;
  children: ReactNode;
}) {
  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : "btn-on-dark";
  return (
    <Link
      href={href}
      className={`${variantClass} ${className}`}
      onClick={() => track(event)}
    >
      {children}
    </Link>
  );
}
