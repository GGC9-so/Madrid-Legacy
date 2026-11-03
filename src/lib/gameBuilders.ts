// Constructores de preguntas. Edita aquí las preguntas, frases y alineaciones de los minijuegos.
import { PLAYERS, positionLabel } from "@/data/players";
import { SIGNINGS } from "@/data/signings";
import { LEGENDS } from "@/data/legends";
import { MOMENTS } from "@/data/moments";
import { TROPHIES } from "@/data/site";
import { pick, shuffle } from "./random";

export interface Question {
  id: string;
  prompt: string;
  detail?: string;
  clues?: string[];
  options: string[];
  answer: number; // índice de la opción correcta
  explain?: string;
  keepOrder?: boolean; // no mezclar las opciones (p. ej. Más / Menos)
}

const ROUNDS = 8;
const others = <T,>(list: readonly T[], skip: T, n: number) => pick(list.filter((x) => x !== skip), n);

// 1 · Adivina el jugador (usa src/data/players.ts)
export const buildGuessPlayer = (): Question[] =>
  pick(PLAYERS, ROUNDS).map((p) => ({
    id: p.slug,
    prompt: "¿Quién es este jugador del Madrid?",
    clues: [`Es ${positionLabel(p.position).toLowerCase()} y representa a ${p.country}.`, `Lleva el dorsal ${p.number} esta temporada.`, p.bio],
    options: [p.name, ...others(PLAYERS, p, 3).map((o) => o.name)],
    answer: 0,
    explain: `Es ${p.name}.`,
  }));

// 2 · Adivina el fichaje (usa src/data/signings.ts)
export const buildGuessSigning = (): Question[] =>
  pick(SIGNINGS, ROUNDS).map((s) => ({
    id: s.slug,
    prompt: "¿Qué fichaje histórico es?",
    clues: [`Es ${positionLabel(s.position).toLowerCase()} y llegó al club en los años ${Math.floor(s.year / 10) * 10}.`, `Llegó desde ${s.from}.`, s.story],
    options: [s.name, ...others(SIGNINGS, s, 3).map((o) => o.name)],
    answer: 0,
    explain: `Es ${s.name}, fichado en ${s.year}.`,
  }));

// 3 · ¿Quién lo dijo? Frases en primera persona basadas en hechos reales (no son citas textuales).
const SAYINGS = [
  { text: "Marqué en las cinco finales de Copa de Europa que ganamos entre 1956 y 1960.", who: "Alfredo Di Stéfano" },
  { text: "Soy el único futbolista de la historia con seis Copas de Europa.", who: "Francisco Gento" },
  { text: "Presidí el club durante 35 años y el estadio lleva mi nombre.", who: "Santiago Bernabéu" },
  { text: "Mi volea de zurda en Glasgow nos dio la Novena.", who: "Zinedine Zidane" },
  { text: "Marqué 450 goles con la camiseta blanca.", who: "Cristiano Ronaldo" },
  { text: "Mi cabezazo en el minuto 93 de Lisboa nos llevó a la Décima.", who: "Sergio Ramos" },
  { text: "Gané el Balón de Oro en 2018 y seis Champions con el club.", who: "Luka Modrić" },
  { text: "Mi chilena en Kiev decidió la final ante el Liverpool.", who: "Gareth Bale" },
  { text: "Fui el Buitre, la cara de una Quinta que ganó cinco Ligas seguidas.", who: "Emilio Butragueño" },
  { text: "Marqué cuatro goles en la final de 1960 y me llamaban el Cañoncito pum.", who: "Ferenc Puskás" },
  { text: "Fui capitán y portero, ganamos tres Copas de Europa y me llamaban San Iker.", who: "Iker Casillas" },
  { text: "Llegué libre en 2024 y esta temporada llevo el 10.", who: "Kylian Mbappé" },
];
const NAMES = Array.from(new Set([...SAYINGS.map((s) => s.who), ...SIGNINGS.map((s) => s.name), ...LEGENDS.map((l) => l.name)]));

export const buildWhoSaid = (): Question[] =>
  pick(SAYINGS, ROUNDS).map((s, i) => ({
    id: `say-${i}`,
    prompt: "¿Quién diría esta frase?",
    detail: `«${s.text}»`,
    options: [s.who, ...others(NAMES, s.who, 3)],
    answer: 0,
    explain: `Es ${s.who}.`,
  }));

// 4 · Completa la alineación histórica (filas: portero, defensas, medios, delanteros)
const LINEUPS = [
  { title: "Final de la Copa de Europa de 2002, en Glasgow", rows: [["César"], ["Salgado", "Hierro", "Helguera", "Roberto Carlos"], ["Makélélé", "McManaman", "Zidane", "Figo"], ["Raúl", "Morientes"]] },
  { title: "Final de la Champions de 2018, en Kiev", rows: [["Keylor Navas"], ["Carvajal", "Varane", "Ramos", "Marcelo"], ["Casemiro", "Modrić", "Kroos"], ["Isco"], ["Benzema", "Cristiano"]] },
  { title: "Final de la Champions de 2022, en París", rows: [["Courtois"], ["Carvajal", "Alaba", "Militão", "Mendy"], ["Casemiro", "Kroos", "Modrić"], ["Valverde", "Benzema", "Vinícius"]] },
];
const POOL = ["Casillas", "Nacho", "Pepe", "Bale", "Xabi Alonso", "Di María", "Danilo", "Coentrão", "Guti", "Solari", "Rüdiger", "Camavinga", "Tchouaméni", "Rodrygo", "Lunin", "Marcelo", "Modrić", "Kroos", "Benzema", "Raúl", "Figo", "Zidane", "Ramos", "Varane", "Carvajal", "Mendy", "Valverde", "Vinícius", "Hierro"];

export const buildLineups = (): Question[] =>
  shuffle(
    LINEUPS.flatMap((l) => {
      const all = l.rows.flat();
      return pick(all, 2).map((name): Question => ({
        id: `${l.title}-${name}`,
        prompt: `${l.title}. ¿Quién falta en el once?`,
        detail: l.rows.map((r) => r.map((x) => (x === name ? "¿?" : x)).join(", ")).join("\n"),
        options: [name, ...pick(POOL.filter((x) => !all.includes(x)), 3)],
        answer: 0,
        explain: `En esa final fue titular ${name}.`,
      }));
    }),
  );

// 5 · Quiz de títulos (las cifras salen de TROPHIES en src/data/site.ts)
const FACTS: Question[] = [
  { id: "f1", prompt: "¿En qué año ganó el Madrid su primera Copa de Europa?", options: ["1956", "1958", "1960", "1966"], answer: 0, explain: "Fue en París, con un 4-3 al Stade de Reims." },
  { id: "f2", prompt: "¿Contra qué equipo ganó el Madrid la final de la Décima, en 2014?", options: ["Atlético de Madrid", "Juventus", "Bayern de Múnich", "Liverpool"], answer: 0, explain: "Ganó 4-1 en la prórroga, en Lisboa." },
  { id: "f3", prompt: "¿Quién marcó el gol de la Séptima en Ámsterdam, en 1998?", options: ["Predrag Mijatović", "Raúl", "Fernando Morientes", "Clarence Seedorf"], answer: 0, explain: "Mijatović marcó el 1-0 a la Juventus." },
  { id: "f4", prompt: "¿Qué equipo perdió 7-3 contra el Madrid en la final de 1960?", options: ["Eintracht Fráncfort", "Stade de Reims", "Benfica", "Partizan"], answer: 0, explain: "Fue la quinta Copa de Europa consecutiva." },
  { id: "f5", prompt: "¿En qué estadio se jugó la final de la Decimoquinta, en 2024?", options: ["Wembley", "Stade de France", "San Siro", "Estádio da Luz"], answer: 0, explain: "El Madrid ganó 2-0 al Borussia Dortmund." },
  { id: "f6", prompt: "¿En qué año se constituyó oficialmente el club?", options: ["1902", "1899", "1910", "1920"], answer: 0, explain: "El 6 de marzo de 1902." },
  { id: "f7", prompt: "¿Qué rey concedió al club el título de «Real»?", options: ["Alfonso XIII", "Alfonso XII", "Juan Carlos I", "Felipe V"], answer: 0, explain: "Fue en 1920." },
  { id: "f8", prompt: "¿Cuántas Copas de Europa seguidas ganó el Madrid entre 1956 y 1960?", options: ["5", "3", "4", "6"], answer: 0, explain: "Cinco seguidas, un récord que sigue en pie." },
];

export const buildTitles = (): Question[] => {
  const counts: Question[] = TROPHIES.map((t) => ({
    id: t.label,
    prompt: `¿Cuántas ${t.label} ha ganado el Real Madrid?`,
    options: Array.from(new Set([t.count, t.count + 1, t.count + 3, Math.max(1, t.count - 2)])).map(String),
    answer: 0,
    explain: `Son ${t.count}.`,
  }));
  // la respuesta correcta es la primera opción antes de mezclar: aseguramos que sea el recuento real
  counts.forEach((q, i) => { q.options = [String(TROPHIES[i].count), ...q.options.filter((o) => o !== String(TROPHIES[i].count))]; });
  return pick([...FACTS, ...counts], ROUNDS);
};

// 6 · ¿En qué año pasó? (usa moments.ts y signings.ts)
const yearOptions = (y: number) => [y, y - 6, y - 3, y + 2].map(String);

export const buildYears = (): Question[] => {
  const moments = MOMENTS.map((m) => ({ id: m.id, prompt: `¿En qué año ocurrió esto? ${m.title}: ${m.text}`, year: m.year }));
  const arrivals = SIGNINGS.map((s) => ({ id: s.slug, prompt: `¿En qué año fichó el Real Madrid a ${s.name}?`, year: s.year }));
  return pick([...moments, ...arrivals], ROUNDS).map((x) => ({ id: x.id, prompt: x.prompt, options: yearOptions(x.year), answer: 0, explain: `Fue en ${x.year}.` }));
};

// 8 · Más o menos (títulos desde site.ts; goles con el Madrid en GOALS)
const GOALS = [
  { name: "Cristiano Ronaldo", value: 450 },
  { name: "Karim Benzema", value: 354 },
  { name: "Raúl", value: 323 },
  { name: "Alfredo Di Stéfano", value: 308 },
];
const pairsOf = <T extends { value: number }>(items: T[]) =>
  items.flatMap((a) => items.filter((b) => b !== a && b.value !== a.value).map((b) => [a, b] as const));

export const buildMoreLess = (): Question[] => {
  const mk = (id: string, prompt: string, a: number, b: number, who: string): Question => ({ id, prompt, options: ["Más", "Menos"], answer: b > a ? 0 : 1, explain: `${who}: ${b}.`, keepOrder: true });
  const titles = pairsOf(TROPHIES.map((t) => ({ label: t.label, value: t.count }))).map(([a, b]) => mk(`t-${a.label}-${b.label}`, `El club tiene ${a.value} ${a.label}. ¿Tiene más o menos ${b.label}?`, a.value, b.value, b.label));
  const goals = pairsOf(GOALS).map(([a, b]) => mk(`g-${a.name}-${b.name}`, `${a.name} marcó ${a.value} goles con el Madrid. ¿${b.name} marcó más o menos?`, a.value, b.value, b.name));
  return pick([...titles, ...goals], 10);
};
