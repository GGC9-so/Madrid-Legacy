// Los partidos de respaldo viven en matches.json. Con una clave de API (ver README) se actualizan solos.
import raw from "./matches.json";

export type Competition = "laliga" | "ucl";
export type Result = "win" | "draw" | "loss";

export interface Match {
  id: string;
  date: string; // AAAA-MM-DD (hora de España)
  time: string | null; // hora de España, o null si no está confirmada
  competition: Competition;
  round: string;
  opponent: string;
  venue: "home" | "away";
  status: "finished" | "live" | "upcoming";
  score: [number, number] | null; // [Real Madrid, rival]; en vivo es el marcador provisional
}

export const COMPETITIONS: Record<Competition, string> = { laliga: "LaLiga", ucl: "Champions League" };

export const MATCHES = raw as unknown as Match[];

const finished = (list: Match[]) => list.filter((m) => m.status === "finished" && m.score);

export const resultOf = (m: Match): Result | null =>
  m.status !== "finished" || !m.score ? null : m.score[0] > m.score[1] ? "win" : m.score[0] < m.score[1] ? "loss" : "draw";

export function seasonRecord(matches: Match[] = MATCHES) {
  const done = finished(matches);
  const count = (r: Result) => done.filter((m) => resultOf(m) === r).length;
  return {
    played: done.length,
    wins: count("win"),
    draws: count("draw"),
    losses: count("loss"),
    goalsFor: done.reduce((n, m) => n + m.score![0], 0),
    goalsAgainst: done.reduce((n, m) => n + m.score![1], 0),
  };
}

// Datos de equipo calculados con los partidos jugados
export function teamExtras(matches: Match[] = MATCHES) {
  const done = finished(matches);
  const rec = (list: Match[]) => {
    const n = (r: Result) => list.filter((m) => resultOf(m) === r).length;
    return `${n("win")}V ${n("draw")}E ${n("loss")}D`;
  };
  const margin = (m: Match) => m.score![0] - m.score![1];
  const best = done.filter((m) => margin(m) > 0).sort((a, b) => margin(b) - margin(a) || b.score![0] - a.score![0])[0];
  let streak = 0;
  for (let i = done.length - 1; i >= 0 && resultOf(done[i]) === "win"; i--) streak++;
  return {
    cleanSheets: done.filter((m) => m.score![1] === 0).length,
    home: rec(done.filter((m) => m.venue === "home")),
    away: rec(done.filter((m) => m.venue === "away")),
    streak,
    best: best ? `${best.score![0]}-${best.score![1]} vs ${best.opponent}` : "—",
  };
}

export const nextMatch = (matches: Match[] = MATCHES) => matches.find((m) => m.status !== "finished");
export const lastMatch = (matches: Match[] = MATCHES) => [...finished(matches)].reverse()[0];
export const lastResults = (n: number, matches: Match[] = MATCHES) => finished(matches).slice(-n);
