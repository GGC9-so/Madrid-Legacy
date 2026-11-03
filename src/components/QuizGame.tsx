"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, RotateCcw, X } from "lucide-react";
import { shuffle } from "@/lib/random";
import type { Question } from "@/lib/gameBuilders";

type Phase = "intro" | "play" | "done";
type Props = { id: string; rules: string; build: () => Question[]; onFinish?: (score: number, total: number) => void };

const maxOf = (q: Question) => q.clues?.length ?? 1;

function shuffleOptions(q: Question): Question {
  if (q.keepOrder) return q;
  const correct = q.options[q.answer];
  const options = shuffle(q.options);
  return { ...q, options, answer: options.indexOf(correct) };
}

export default function QuizGame({ id, rules, build, onFinish }: Props) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [qs, setQs] = useState<Question[]>([]);
  const [i, setI] = useState(0);
  const [revealed, setRevealed] = useState(1);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const key = `madrid-legacy:best:${id}`;

  useEffect(() => {
    try { const v = localStorage.getItem(key); if (v) setBest(Number(v)); } catch {}
  }, [key]);

  const start = () => {
    setQs(build().map(shuffleOptions));
    setI(0); setScore(0); setPicked(null); setRevealed(1); setPhase("play");
  };

  const q = qs[i];
  const total = qs.reduce((n, x) => n + maxOf(x), 0);
  const gained = q ? maxOf(q) - (revealed - 1) : 0;

  const answer = (idx: number) => {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.answer) setScore((s) => s + gained);
  };

  const next = () => {
    if (i + 1 < qs.length) { setI(i + 1); setPicked(null); setRevealed(1); return; }
    setPhase("done");
    onFinish?.(score, total);
    if (!onFinish && (best === null || score > best)) {
      setBest(score);
      try { localStorage.setItem(key, String(score)); } catch {}
    }
  };

  if (phase === "intro") {
    return (
      <div className="card p-8">
        <p className="text-lg leading-relaxed text-night/80">{rules}</p>
        {best !== null && <p className="mt-4 text-sm text-muted">Tu mejor marcador: <strong className="text-night">{best}</strong></p>}
        <button type="button" onClick={start} className="btn-gold mt-8">Jugar</button>
      </div>
    );
  }

  if (phase === "done" && onFinish) return null;

  if (phase === "done") {
    const ratio = total ? score / total : 0;
    return (
      <div className="card p-8 text-center">
        <p className="font-display text-7xl tabular-nums text-gold-dark">{score}<span className="text-3xl text-muted"> / {total}</span></p>
        <p className="mt-3 text-xl text-night">{ratio >= 0.85 ? "¡Madridista de pro!" : ratio >= 0.5 ? "Buen partido, pero se puede mejorar." : "Toca entrenar un poco más."}</p>
        {best !== null && <p className="mt-2 text-sm text-muted">Mejor marcador: {best}</p>}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={start} className="btn-gold"><RotateCcw className="h-4 w-4" /> Jugar de nuevo</button>
          <Link href="/games" className="btn-night">Más juegos</Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-sm text-muted">
        <span>Pregunta {i + 1} de {qs.length}</span>
        <span>Puntos: <strong className="text-night">{score}</strong> / {total}</span>
      </div>
      <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-night/10">
        <motion.div className="h-full rounded-full bg-gold" animate={{ width: `${((i + (picked !== null ? 1 : 0)) / qs.length) * 100}%` }} transition={{ duration: 0.4 }} />
      </div>

      <h2 className="text-2xl text-night sm:text-3xl">{q.prompt}</h2>
      {q.detail && <p className="mt-4 whitespace-pre-line rounded-xl border border-gold/30 bg-white p-5 font-display text-lg leading-relaxed text-night">{q.detail}</p>}
      {q.clues && (
        <ul className="mt-5 space-y-2">
          {q.clues.slice(0, revealed).map((c, k) => <li key={k} className="border-l-2 border-gold pl-4 text-night/80">{c}</li>)}
        </ul>
      )}
      {q.clues && picked === null && revealed < q.clues.length && (
        <button type="button" onClick={() => setRevealed((r) => r + 1)} className="mt-4 text-sm font-semibold text-gold-dark hover:underline">Pedir otra pista (−1 punto)</button>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {q.options.map((o, k) => {
          const state = picked === null ? "border-gold/40 bg-white hover:border-gold hover:bg-gold/5" : k === q.answer ? "border-win bg-win/10" : k === picked ? "border-loss bg-loss/10" : "border-gold/20 bg-white opacity-60";
          return (
            <button key={k} type="button" disabled={picked !== null} onClick={() => answer(k)} className={`flex items-center justify-between gap-3 rounded-xl border p-4 text-left font-semibold text-night transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold ${state}`}>
              <span>{o}</span>
              {picked !== null && k === q.answer && <Check className="h-5 w-5 shrink-0 text-win" aria-hidden />}
              {picked === k && k !== q.answer && <X className="h-5 w-5 shrink-0 text-loss" aria-hidden />}
            </button>
          );
        })}
      </div>

      <div aria-live="polite" className="mt-6 min-h-[4rem]">
        {picked !== null && (
          <>
            <p className={`font-semibold ${picked === q.answer ? "text-win" : "text-loss"}`}>{picked === q.answer ? `¡Correcto! +${gained}` : "Fallaste."}</p>
            {q.explain && <p className="mt-1 text-night/80">{q.explain}</p>}
            <button type="button" onClick={next} className="btn-night mt-5">{i + 1 < qs.length ? "Siguiente" : "Ver resultado"}</button>
          </>
        )}
      </div>
    </div>
  );
}
