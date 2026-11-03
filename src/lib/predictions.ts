import { MATCHES, type Match } from "@/data/matches";

export type Pred = [number, number]; // [goles Real Madrid, goles rival]
export const PRED_KEY = "madrid-legacy:predictions";

export function loadPredictions(): Record<string, Pred> {
  try { const raw = localStorage.getItem(PRED_KEY); return raw ? JSON.parse(raw) : {}; } catch { return {}; }
}

export function savePredictions(preds: Record<string, Pred>) {
  try { localStorage.setItem(PRED_KEY, JSON.stringify(preds)); } catch {}
}

/** 5 puntos por marcador exacto, 2 por acertar victoria, empate o derrota. */
export const pointsFor = (pred: Pred, actual: [number, number]) =>
  pred[0] === actual[0] && pred[1] === actual[1] ? 5 : Math.sign(pred[0] - pred[1]) === Math.sign(actual[0] - actual[1]) ? 2 : 0;

export const totalPoints = (preds: Record<string, Pred>, matches: Match[] = MATCHES) =>
  matches.reduce((n, m) => (m.status === "finished" && m.score && preds[m.id] ? n + pointsFor(preds[m.id], m.score) : n), 0);
