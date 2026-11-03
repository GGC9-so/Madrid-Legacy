"use client";

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { COPAS } from "@/data/copas";

export default function CopasScroll() {
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll();
  const cur = COPAS[active];

  return (
    <>
      <motion.div aria-hidden style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-gold" />
      <div className="container-x grid gap-x-12 pb-24 lg:grid-cols-[16rem_1fr]">
        <div className="sticky top-16 z-10 -mx-5 self-start bg-mist/90 px-5 py-3 backdrop-blur lg:top-28 lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
          <p className="font-display text-4xl tabular-nums text-night lg:text-7xl">{cur.n}<span className="text-xl text-muted lg:text-2xl"> / 15</span></p>
          <p className="text-sm text-gold-dark">{cur.year} · {cur.nick}</p>
          <ol aria-hidden className="mt-3 flex gap-1 lg:mt-6 lg:flex-wrap">
            {COPAS.map((c, i) => <li key={c.n} className={`h-1.5 flex-1 rounded-full transition-colors lg:h-2 lg:w-6 lg:flex-none ${i <= active ? "bg-gold" : "bg-night/15"}`} />)}
          </ol>
        </div>

        <div>
          {COPAS.map((c, i) => (
            <motion.article
              key={c.n}
              onViewportEnter={() => setActive(i)}
              viewport={{ amount: 0.5 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex min-h-[70vh] flex-col justify-center border-t border-gold/30 py-14"
            >
              <p className="font-display text-7xl tabular-nums text-gold-dark sm:text-8xl">{c.year}</p>
              <h2 className="mt-2 text-3xl text-night sm:text-4xl">{c.nick}</h2>
              <p className="mt-8 text-xl text-night">
                Real Madrid <strong className="px-1 font-display text-5xl tabular-nums text-gold-dark">{c.score}</strong> {c.rival}
              </p>
              <p className="mt-2 text-muted">{c.city}{c.note ? ` · ${c.note}` : ""}</p>
              <p className="mt-5 text-night/80"><span className="font-semibold text-night">Goles:</span> {c.scorers}</p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-night/80">{c.story}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </>
  );
}
