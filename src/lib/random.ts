let state: number | null = null;

/** Fija una semilla para que shuffle/pick sean deterministas; pasa null para volver al azar normal. */
export function setSeed(seed: number | null) {
  state = seed;
}

function rand() {
  if (state === null) return Math.random();
  state = (state + 0x6d2b79f5) >>> 0;
  let t = Math.imul(state ^ (state >>> 15), 1 | state);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const pick = <T,>(items: readonly T[], n: number): T[] => shuffle(items).slice(0, n);
