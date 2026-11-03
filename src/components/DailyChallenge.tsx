"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Copy, Flame } from "lucide-react";
import QuizGame from "./QuizGame";
import Skeleton from "./Skeleton";
import { buildDaily } from "@/lib/daily";
import { SITE } from "@/data/site";

const KEY = "madrid-legacy:daily";
type Saved = { streak: number; best: number; last: string | null; days: Record<string, { score: number; total: number }> };
const EMPTY: Saved = { streak: 0, best: 0, last: null, days: {} };

const keyOf = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const RULES = "Cinco preguntas nuevas cada día, las mismas para todos. Juegas una vez al día: si lo haces varios días seguidos, tu racha crece. Mañana, otras cinco.";

export default function DailyChallenge() {
  const [saved, setSaved] = useState<Saved>(EMPTY);
  const [today, setToday] = useState("");
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setToday(keyOf(new Date()));
    try { const raw = localStorage.getItem(KEY); if (raw) setSaved({ ...EMPTY, ...JSON.parse(raw) }); } catch {}
    setReady(true);
  }, []);

  if (!ready) return <Skeleton className="h-64" />;

  const yesterday = keyOf(new Date(Date.now() - 86400000));
  const streak = saved.last === today || saved.last === yesterday ? saved.streak : 0;
  const result = saved.days[today];

  const finish = (score: number, total: number) => {
    const next: Saved = {
      streak: saved.last === yesterday ? saved.streak + 1 : 1,
      best: 0,
      last: today,
      days: { ...saved.days, [today]: { score, total } },
    };
    next.best = Math.max(saved.best, next.streak);
    setSaved(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const share = async () => {
    const text = `Madrid Legacy · Reto del Día (${today})\nHe sacado ${result.score}/${result.total} ⚽\nRacha: ${saved.streak} ${saved.streak === 1 ? "día" : "días"} 🔥\n${SITE.url}/daily`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2500); } catch {}
  };

  return (
    <div>
      <p className="mb-6 flex items-center gap-2 text-night">
        <Flame className="h-5 w-5 text-gold-dark" aria-hidden />
        <span>Racha actual: <strong>{streak} {streak === 1 ? "día" : "días"}</strong></span>
        <span className="text-muted">· Mejor racha: {saved.best}</span>
      </p>
      {result ? (
        <div className="card p-8 text-center">
          <p className="font-display text-7xl tabular-nums text-gold-dark">{result.score}<span className="text-3xl text-muted"> / {result.total}</span></p>
          <p className="mt-3 text-xl text-night">Reto de hoy completado. Vuelve mañana para mantener la racha.</p>
          <p className="mt-2 text-muted">{result.score / result.total >= 0.5 ? "¡Has ganado un sobre extra en tu álbum de cromos!" : "Con la mitad de los puntos o más ganas un sobre extra."}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={share} className="btn-gold">
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "¡Copiado!" : "Copiar mi resultado"}
            </button>
            {result.score / result.total >= 0.5 && <Link href="/album" className="btn-night">Abrir mi sobre extra</Link>}
            <Link href="/games" className="btn-ghost-dark">Seguir jugando</Link>
          </div>
        </div>
      ) : (
        <QuizGame key={today} id="daily" rules={RULES} build={() => buildDaily(today)} onFinish={finish} />
      )}
    </div>
  );
}
