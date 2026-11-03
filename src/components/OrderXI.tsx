"use client";

import { useState } from "react";
import GameIntro from "./GameIntro";
import { shuffle } from "@/lib/random";

type Slot = { id: string; label: string; x: number; y: number; accept: string[] };
const s = (id: string, label: string, x: number, y: number, ...accept: string[]): Slot => ({ id, label, x, y, accept });

// Si dos puestos admiten los mismos nombres, el orden entre ellos es indiferente.
const LINEUPS: { title: string; slots: Slot[] }[] = [
  { title: "Final de la Champions de 2022, en París", slots: [
    s("gk", "POR", 50, 91, "Courtois"), s("rb", "LD", 86, 70, "Carvajal"), s("cb1", "DFC", 63, 75, "Militão", "Alaba"), s("cb2", "DFC", 37, 75, "Militão", "Alaba"), s("lb", "LI", 14, 70, "Mendy"),
    s("m1", "MC", 27, 53, "Casemiro", "Kroos", "Modrić"), s("m2", "MC", 50, 57, "Casemiro", "Kroos", "Modrić"), s("m3", "MC", 73, 53, "Casemiro", "Kroos", "Modrić"),
    s("lw", "EI", 18, 24, "Vinícius"), s("st", "DC", 50, 15, "Benzema"), s("rw", "ED", 82, 24, "Valverde"),
  ] },
  { title: "Final de la Champions de 2018, en Kiev", slots: [
    s("gk", "POR", 50, 91, "Keylor Navas"), s("rb", "LD", 86, 70, "Carvajal"), s("cb1", "DFC", 63, 75, "Varane", "Ramos"), s("cb2", "DFC", 37, 75, "Varane", "Ramos"), s("lb", "LI", 14, 70, "Marcelo"),
    s("m1", "MC", 27, 58, "Casemiro", "Kroos", "Modrić"), s("m2", "MC", 50, 62, "Casemiro", "Kroos", "Modrić"), s("m3", "MC", 73, 58, "Casemiro", "Kroos", "Modrić"),
    s("am", "MCO", 50, 38, "Isco"), s("st1", "DC", 33, 16, "Benzema", "Cristiano"), s("st2", "DC", 67, 16, "Benzema", "Cristiano"),
  ] },
];

const RULES = "Te damos los once de una gran final en desorden. Toca un jugador y después su posición en el campo. Cuando los coloques a todos, comprueba. El orden entre centrales y entre centrocampistas es indiferente.";

export default function OrderXI() {
  const [idx, setIdx] = useState<number | null>(null);
  const [order, setOrder] = useState<string[]>([]);
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [sel, setSel] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  const start = () => {
    const i = Math.floor(Math.random() * LINEUPS.length);
    setIdx(i);
    setOrder(shuffle(Array.from(new Set(LINEUPS[i].slots.flatMap((x) => x.accept)))));
    setPlaced({}); setSel(null); setChecked(false);
  };

  if (idx === null) return <GameIntro rules={RULES} onStart={start} />;

  const lineup = LINEUPS[idx];
  const used = new Set(Object.values(placed));
  const bank = order.filter((n) => !used.has(n));
  const correct = lineup.slots.filter((x) => x.accept.includes(placed[x.id])).length;

  const tapSlot = (slotId: string) => {
    if (checked) return;
    if (sel) { setPlaced((p) => ({ ...p, [slotId]: sel })); setSel(null); return; }
    if (placed[slotId]) setPlaced((p) => { const n = { ...p }; delete n[slotId]; return n; });
  };

  return (
    <div>
      <h2 className="mb-6 text-2xl text-night">{lineup.title}</h2>
      <div className="relative mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-night-light to-night shadow-card">
        <div aria-hidden className="absolute inset-3 rounded-lg border border-gold/30" />
        <div aria-hidden className="absolute inset-x-3 top-1/2 h-px bg-gold/30" />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
        {lineup.slots.map((slot) => {
          const name = placed[slot.id];
          const tone = checked ? (slot.accept.includes(name) ? "border-win bg-win text-white" : "border-loss bg-loss text-white") : name ? "border-gold bg-white text-night" : "border-dashed border-gold/60 text-gold";
          return (
            <button key={slot.id} type="button" onClick={() => tapSlot(slot.id)} aria-label={name ? `${slot.label}: ${name}` : `Colocar en ${slot.label}`} style={{ left: `${slot.x}%`, top: `${slot.y}%` }} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <span className={`grid h-11 w-11 place-items-center rounded-full border-2 text-xs font-bold transition sm:h-12 sm:w-12 ${tone} ${sel && !checked ? "ring-2 ring-gold/50" : ""}`}>{slot.label}</span>
              <span className="max-w-[5.5rem] truncate text-[11px] font-semibold text-white">{name ?? "·"}</span>
            </button>
          );
        })}
      </div>

      {!checked ? (
        <>
          <ul className="mt-6 flex min-h-[3rem] flex-wrap gap-2" aria-label="Jugadores por colocar">
            {bank.map((n) => (
              <li key={n}>
                <button type="button" aria-pressed={sel === n} onClick={() => setSel(sel === n ? null : n)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${sel === n ? "border-night bg-night text-white" : "border-gold/50 bg-white text-night hover:border-gold"}`}>{n}</button>
              </li>
            ))}
          </ul>
          <button type="button" disabled={bank.length > 0} onClick={() => setChecked(true)} className="btn-gold mt-4 disabled:opacity-50">Comprobar mi once</button>
        </>
      ) : (
        <div aria-live="polite" className="mt-6">
          <p className="text-xl text-night">Has acertado <strong className="text-gold-dark">{correct}</strong> de 11.</p>
          <button type="button" onClick={start} className="btn-night mt-4">Otra alineación</button>
        </div>
      )}
    </div>
  );
}
