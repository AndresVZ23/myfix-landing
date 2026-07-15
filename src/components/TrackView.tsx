"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track, type TrackEvent } from "@/lib/track";

/** Dispara un evento de analítica la primera vez que su contenido es visible. */
export default function TrackView({
  event,
  children,
}: {
  event: TrackEvent;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          track(event);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [event]);

  return <div ref={ref}>{children}</div>;
}
