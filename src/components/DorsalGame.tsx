"use client";

import { useState } from "react";
import GameIntro from "./GameIntro";
import GameResult from "./GameResult";
import { PLAYERS, type Player } from "@/data/players";
import { pick, shuffle } from "@/lib/random";

const PAIRS = 6;
const RULES = "Seis jugadores y seis dorsales mezclados. Toca un jugador y después su número. Cada error te quita un punto.";

export default function DorsalGame() {
  const [started, setStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [sel, setSel] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [errors, setErrors] = useState(0);
  const [wrong, setWrong] = useState<number | null>(null);

  const start = () => {
    const p = pick(PLAYERS, PAIRS);
    setPlayers(p); setNumbers(shuffle(p.map((x) => x.number)));
    setSel(null); setDone([]); setErrors(0); setStarted(true);
  };

  const tapNumber = (n: number) => {
    const p = players.find((x) => x.slug === sel);
    if (!p) return;
    if (p.number === n) { setDone((d) => [...d, p.slug]); setSel(null); return; }
    setErrors((e) => e + 1);
    setWrong(n);
    setTimeout(() => setWrong(null), 500);
  };

  if (!started) return <GameIntro rules={RULES} onStart={start} />;

  const score = Math.max(0, PAIRS - errors);
  if (done.length === PAIRS) {
    return <GameResult score={score} total={PAIRS} message={errors === 0 ? "¡Dorsales sin fallo!" : "Partido completado."} onReplay={start} />;
  }

  const matchedNumbers = players.filter((p) => done.includes(p.slug)).map((p) => p.number);

  return (
    <div>
      <p className="mb-6 text-sm text-muted">Emparejados: <strong className="text-night">{done.length}</strong> de {PAIRS} · Errores: <strong className="text-night">{errors}</strong></p>
      <div className="grid grid-cols-2 gap-6">
        <ul className="space-y-3" aria-label="Jugadores">
          {players.map((p) => {
            const ok = done.includes(p.slug);
            return (
              <li key={p.slug}>
                <button type="button" disabled={ok} aria-pressed={sel === p.slug} onClick={() => setSel(p.slug)} className={`w-full rounded-xl border p-4 text-left font-semibold transition ${ok ? "border-win bg-win/10 text-night" : sel === p.slug ? "border-gold bg-gold/15 text-night" : "border-gold/40 bg-white text-night hover:border-gold"}`}>
                  {p.name}
                </button>
              </li>
            );
          })}
        </ul>
        <ul className="space-y-3" aria-label="Dorsales">
          {numbers.map((n) => {
            const ok = matchedNumbers.includes(n);
            return (
              <li key={n}>
                <button type="button" disabled={ok || !sel} onClick={() => tapNumber(n)} className={`w-full rounded-xl border p-4 text-center font-display text-2xl tabular-nums transition ${ok ? "border-win bg-win/10 text-night" : wrong === n ? "border-loss bg-loss/10 text-loss" : "border-gold/40 bg-white text-night enabled:hover:border-gold disabled:opacity-60"}`}>
                  {n}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <p aria-live="polite" className="mt-6 text-sm text-muted">{sel ? "Ahora elige su dorsal." : "Elige un jugador."}</p>
    </div>
  );
}
