"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GameIntro from "./GameIntro";
import GameResult from "./GameResult";

const COLS = [17, 50, 83];
const ROWS = [27, 68];
const SHOTS = 5;
const ZONES = ["Arriba a la izquierda", "Arriba al centro", "Arriba a la derecha", "Abajo a la izquierda", "Abajo al centro", "Abajo a la derecha"];
const TEXT = { goal: "¡Gol!", saved: "¡Parada del portero!", miss: "¡Fuera! Por encima del larguero." };
const KEY = "madrid-legacy:best:penaltis";
const RULES = "Cinco penaltis. Elige a qué zona de la portería disparas. El portero se lanza al azar: si coincide contigo, tiro abajo casi seguro parada. Y cuidado con los tiros altos: pueden salir fuera.";

type Shot = { col: number; row: number; keeper: number; outcome: "goal" | "saved" | "miss" };

export default function PenaltyGame() {
  const [phase, setPhase] = useState<"intro" | "play" | "done">("intro");
  const [shots, setShots] = useState<Shot[]>([]);
  const [current, setCurrent] = useState<Shot | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [best, setBest] = useState<number | null>(null);
  const goals = shots.filter((x) => x.outcome === "goal").length;

  useEffect(() => {
    try { const v = localStorage.getItem(KEY); if (v) setBest(Number(v)); } catch {}
  }, []);

  useEffect(() => {
    if (!current) return;
    const t = setTimeout(() => { setShots((s) => [...s, current]); setRevealed(true); }, 900);
    return () => clearTimeout(t);
  }, [current]);

  const start = () => { setShots([]); setCurrent(null); setRevealed(false); setPhase("play"); };

  const shoot = (col: number, row: number) => {
    if (current) return;
    const keeper = Math.floor(Math.random() * 3);
    const miss = row === 0 && Math.random() < 0.15;
    const saved = !miss && keeper === col && (row === 1 || Math.random() < 0.4);
    setCurrent({ col, row, keeper, outcome: miss ? "miss" : saved ? "saved" : "goal" });
  };

  const advance = () => {
    if (shots.length >= SHOTS) {
      setPhase("done");
      if (best === null || goals > best) { setBest(goals); try { localStorage.setItem(KEY, String(goals)); } catch {} }
      return;
    }
    setCurrent(null); setRevealed(false);
  };

  if (phase === "intro") return <GameIntro rules={RULES} onStart={start} />;
  if (phase === "done") {
    return <GameResult score={goals} total={SHOTS} best={best} message={goals === SHOTS ? "¡Cinco de cinco, sangre fría!" : goals >= 3 ? "Buena tanda, el Bernabéu aplaude." : "Toca entrenar los penaltis."} onReplay={start} />;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-sm text-muted">
        <span>Tiro {Math.min(shots.length + (revealed ? 0 : 1), SHOTS)} de {SHOTS}</span>
        <span>Goles: <strong className="text-night">{goals}</strong></span>
      </div>

      <div className="relative mx-auto aspect-[2/1] w-full max-w-xl overflow-hidden rounded-xl border-2 border-gold/60 bg-night bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.07)_0_1px,transparent_1px_14px)]">
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-2">
          {ZONES.map((label, k) => (
            <button key={label} type="button" aria-label={label} disabled={!!current} onClick={() => shoot(k % 3, Math.floor(k / 3))} className="border border-white/5 transition-colors enabled:hover:bg-gold/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold" />
          ))}
        </div>
        <motion.span aria-hidden initial={false} animate={{ left: `${COLS[current ? current.keeper : 1]}%` }} transition={{ duration: 0.4 }} className="pointer-events-none absolute bottom-[6%] h-[44%] w-[13%] -translate-x-1/2 rounded-t-full border-2 border-white bg-gold/80" />
        <motion.span aria-hidden initial={false} animate={current ? { left: `${COLS[current.col]}%`, top: current.outcome === "miss" ? "-8%" : `${ROWS[current.row]}%` } : { left: "50%", top: "92%" }} transition={{ duration: 0.45, ease: "easeOut" }} className="pointer-events-none absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold bg-white" />
      </div>

      <div className="mt-4 flex justify-center gap-2" aria-hidden>
        {Array.from({ length: SHOTS }, (_, k) => (
          <span key={k} className={`h-3 w-3 rounded-full ${shots[k] ? (shots[k].outcome === "goal" ? "bg-win" : "bg-loss") : "bg-night/15"}`} />
        ))}
      </div>

      <div aria-live="polite" className="mt-6 min-h-[5rem] text-center">
        {!current && <p className="text-muted">Toca una zona de la portería para disparar.</p>}
        {current && revealed && (
          <>
            <p className={`text-2xl font-semibold ${current.outcome === "goal" ? "text-win" : "text-loss"}`}>{TEXT[current.outcome]}</p>
            <button type="button" onClick={advance} className="btn-night mt-4">{shots.length >= SHOTS ? "Ver resultado" : "Siguiente tiro"}</button>
          </>
        )}
      </div>
    </div>
  );
}
