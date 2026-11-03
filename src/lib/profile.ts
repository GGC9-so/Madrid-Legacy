// Lee del navegador todo lo que el usuario ha ido haciendo en la web y calcula su nivel.
import { GAMES } from "@/data/games";
import { MATCHES, type Match } from "@/data/matches";
import { loadPredictions, totalPoints } from "./predictions";

export const PROFILE_KEY = "madrid-legacy:profile";
export const LEVELS = [
  { name: "Cantera", min: 0 },
  { name: "Castilla", min: 100 },
  { name: "Primer equipo", min: 300 },
  { name: "Titular", min: 600 },
  { name: "Leyenda", min: 1000 },
];

const read = <T,>(key: string, fallback: T): T => {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
};

export function readProfile(matches: Match[] = MATCHES) {
  const daily = read<{ streak: number; best: number; last: string | null; days: Record<string, unknown> }>("madrid-legacy:daily", { streak: 0, best: 0, last: null, days: {} });
  const album = read<{ owned: Record<string, number> }>("madrid-legacy:album", { owned: {} });
  const torneo = read<{ played?: number }>("madrid-legacy:torneo", {});
  const xi = read<{ formation?: string; lineups?: Record<string, Record<string, string>> }>("madrid-legacy:ideal-xi", {});

  const cards = Object.keys(album.owned).length;
  const challenges = Object.keys(daily.days).length;
  const predPoints = totalPoints(loadPredictions(), matches);
  const tournaments = torneo.played ?? 0;
  const xiCount = Object.keys(xi.lineups?.[xi.formation ?? ""] ?? {}).length;
  const bests = GAMES.flatMap((g) => {
    try { const v = localStorage.getItem(`madrid-legacy:best:${g.slug}`); return v === null ? [] : [{ title: g.title, best: Number(v) }]; } catch { return []; }
  });

  const xp = cards * 10 + challenges * 15 + daily.best * 5 + predPoints * 3 + tournaments * 10 + xiCount * 3 + bests.reduce((n, b) => n + b.best, 0) * 2;
  const idx = LEVELS.reduce((acc, l, i) => (xp >= l.min ? i : acc), 0);

  return { streak: daily.last ? daily.streak : 0, bestStreak: daily.best, challenges, cards, predPoints, tournaments, xiCount, bests, xp, level: LEVELS[idx], next: LEVELS[idx + 1] ?? null };
}
