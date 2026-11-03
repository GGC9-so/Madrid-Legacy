"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Mientras haya un partido en juego, refresca los datos cada minuto sin recargar la página. */
export default function LiveRefresh({ active }: { active: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => router.refresh(), 60_000);
    return () => clearInterval(id);
  }, [active, router]);
  return null;
}
