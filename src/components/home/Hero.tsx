"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Flame, Target } from "lucide-react";
import { EUROPEAN_CUPS, SITE } from "@/data/site";

const CHIPS = [
  { href: "/daily", label: "Reto del Día", icon: Flame },
  { href: "/album", label: "Abrir mi sobre", icon: BookOpen },
  { href: "/predict", label: "Predice el marcador", icon: Target },
];

export default function Hero() {
  const reduce = useReducedMotion();
  const last = EUROPEAN_CUPS.length - 1;

  return (
    <section className="relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_55%_at_50%_28%,rgba(196,163,90,0.26),transparent_70%)]" />
      <svg aria-hidden viewBox="0 0 800 800" fill="none" stroke="currentColor" strokeWidth="2" className="absolute left-1/2 top-[-8%] -z-10 w-[900px] max-w-none -translate-x-1/2 text-gold opacity-[0.12]">
        <circle cx="400" cy="400" r="120" />
        <circle cx="400" cy="400" r="250" />
        <circle cx="400" cy="400" r="380" />
        <line x1="0" y1="400" x2="800" y2="400" />
      </svg>

      <div className="container-x flex flex-col items-center py-14 text-center sm:py-20 lg:py-24">
        <h1 className="sr-only">{SITE.name}</h1>
        <motion.div initial={reduce ? false : { opacity: 0, scale: 0.92, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }}>
          <Image src="/logo.png" alt="" width={692} height={900} priority className="h-64 w-auto drop-shadow-[0_20px_60px_rgba(196,163,90,0.35)] sm:h-80 lg:h-[26rem]" />
        </motion.div>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
          Cada fichaje, cada final y cada noche de Bernabéu, en un solo lugar. Arma tu once, compara leyendas y demuestra cuánto sabes del club.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/ideal-xi" className="btn-gold">Armar mi 11 ideal <ArrowRight className="h-4 w-4" /></Link>
          <Link href="/games" className="btn-ghost">Jugar ahora</Link>
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {CHIPS.map((c) => (
            <li key={c.href}>
              <Link href={c.href} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition-colors hover:border-gold hover:text-gold">
                <c.icon className="h-4 w-4" aria-hidden /> {c.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-16 w-full max-w-4xl border-t border-gold/25 pt-10">
          <p className="font-display text-2xl">Las 15 Copas de Europa</p>
          <ol className="mt-5 flex flex-wrap justify-center gap-2">
            {EUROPEAN_CUPS.map((year, i) => (
              <motion.li
                key={year}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                className={`rounded-lg border px-3 py-2 font-display text-lg tabular-nums ${i === last ? "border-gold bg-gold text-night" : "border-gold/30 text-gold"}`}
              >
                {year}
              </motion.li>
            ))}
          </ol>
          <Link href="/copas" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold transition-colors hover:text-gold-light">Ver las 15 finales <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </section>
  );
}
