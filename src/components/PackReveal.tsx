"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AlbumCard from "./AlbumCard";
import Logo from "./Logo";
import type { Card } from "@/data/cards";

type Props = { cards: { card: Card; isNew: boolean }[]; onClose: () => void };

export default function PackReveal({ cards, onClose }: Props) {
  const [flipped, setFlipped] = useState<boolean[]>(cards.map(() => false));
  const flip = (i: number) => setFlipped((f) => f.map((v, k) => (k === i ? true : v)));
  const all = flipped.every(Boolean);

  return (
    <div className="rounded-2xl bg-night p-6 text-white sm:p-10">
      <h2 className="text-center text-3xl">Tu sobre</h2>
      <p className="mt-2 text-center text-white/70">Toca cada carta para darle la vuelta.</p>
      <ul className="mx-auto mt-8 grid max-w-3xl grid-cols-3 gap-3 sm:gap-6">
        {cards.map(({ card, isNew }, i) => (
          <li key={i} className="[perspective:1000px]">
            <motion.div
              role="button"
              tabIndex={0}
              aria-label={flipped[i] ? card.name : `Carta ${i + 1}, sin revelar`}
              onClick={() => flip(i)}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(i); } }}
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[3/4] cursor-pointer [transform-style:preserve-3d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <div className="absolute inset-0 grid place-items-center rounded-xl border-2 border-gold bg-night-light [backface-visibility:hidden]">
                <Logo className="h-1/2 w-auto" />
              </div>
              <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <AlbumCard card={card} isNew={isNew} />
              </div>
            </motion.div>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {!all && <button type="button" onClick={() => setFlipped(cards.map(() => true))} className="btn-ghost">Revelar todas</button>}
        {all && <button type="button" onClick={onClose} className="btn-gold">Ver mi álbum</button>}
      </div>
    </div>
  );
}
