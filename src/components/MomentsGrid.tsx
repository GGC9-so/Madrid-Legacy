"use client";

import { useState } from "react";
import Badge from "./Badge";
import Modal from "./Modal";
import { MOMENTS, type Moment } from "@/data/moments";

export default function MomentsGrid() {
  const [active, setActive] = useState<Moment | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MOMENTS.map((m) => (
          <li key={m.id}>
            <button type="button" onClick={() => { setActive(m); setOpen(true); }} className="card card-hover group relative block h-full w-full overflow-hidden p-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <span aria-hidden className="pointer-events-none absolute -right-2 -top-4 font-display text-8xl leading-none tabular-nums text-gold/20 transition-colors group-hover:text-gold/40">{m.year}</span>
              <div className="relative">
                <Badge tone={m.tag === "Final" ? "night" : "gold"}>{m.tag}</Badge>
                <h3 className="mt-14 text-2xl text-night">{m.title}</h3>
                <p className="mt-1 text-sm text-muted">{m.where}</p>
                <p className="mt-3 text-night/80">{m.text}</p>
                <p className="mt-4 text-sm font-semibold text-gold-dark">Leer la historia</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <Modal open={open} onClose={() => setOpen(false)} title={active?.title ?? "Momento"}>
        {active && (
          <>
            <Badge>{active.tag}</Badge>
            <h2 className="mt-4 text-3xl text-night">{active.title}</h2>
            <p className="mt-1 text-sm text-muted">{active.where}</p>
            <p className="mt-5 leading-relaxed text-night/80">{active.story}</p>
          </>
        )}
      </Modal>
    </>
  );
}
