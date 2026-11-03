import { buildGuessPlayer, buildLineups, buildTitles, buildWhoSaid, buildYears, type Question } from "./gameBuilders";
import { setSeed } from "./random";

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
};

/** Las 5 preguntas del día: iguales para todos los que juegan esa fecha (AAAA-MM-DD). */
export function buildDaily(date: string): Question[] {
  setSeed(hash(date));
  try {
    return [buildGuessPlayer()[0], buildWhoSaid()[0], buildTitles()[0], buildYears()[0], buildLineups()[0]];
  } finally {
    setSeed(null);
  }
}
