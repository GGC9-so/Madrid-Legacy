// Resultados en directo desde football-data.org (plan gratuito: LaLiga y Champions, 10 peticiones/minuto).
// Sin FOOTBALL_DATA_API_KEY, o si la API falla, se usa src/data/matches.json y la web funciona igual.
import { MATCHES, type Competition, type Match } from "@/data/matches";
import { LEAGUE } from "@/data/stats";

const API = "https://api.football-data.org/v4";
const TEAM_ID = Number(process.env.FOOTBALL_DATA_TEAM_ID ?? 86); // Real Madrid
const SEASON = process.env.FOOTBALL_DATA_SEASON ?? "2026"; // año en que empieza la temporada
const REVALIDATE = 60; // segundos: una sola petición por minuto compartida por todos los visitantes

interface ApiTeam { id: number; name: string }
interface ApiMatch {
  id: number;
  utcDate: string;
  status: string;
  matchday: number | null;
  stage: string;
  competition: { code: string };
  homeTeam: ApiTeam;
  awayTeam: ApiTeam;
  score: { fullTime: { home: number | null; away: number | null } };
}

async function api<T>(path: string): Promise<T | null> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch(`${API}${path}`, { headers: { "X-Auth-Token": key }, next: { revalidate: REVALIDATE } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}

const CODE: Record<string, Competition> = { PD: "laliga", CL: "ucl" };
const STAGE: Record<string, string> = { PLAYOFFS: "Play-off", LAST_16: "Octavos de final", QUARTER_FINALS: "Cuartos de final", SEMI_FINALS: "Semifinales", FINAL: "Final" };
const clean = (n: string) => n.replace(/\b(FC|CF|CD|UD|RCD|RC|Club|de Fútbol|Balompié)\b/g, "").replace(/\s+/g, " ").trim();

function toMatch(a: ApiMatch): Match | null {
  const competition = CODE[a.competition.code];
  if (!competition) return null;
  const d = new Date(a.utcDate);
  const home = a.homeTeam.id === TEAM_ID;
  const rival = home ? a.awayTeam : a.homeTeam;
  const status: Match["status"] = a.status === "FINISHED" ? "finished" : ["IN_PLAY", "PAUSED", "LIVE"].includes(a.status) ? "live" : "upcoming";
  const { home: h, away: w } = a.score.fullTime;
  return {
    id: `api-${a.id}`,
    date: new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Madrid" }).format(d),
    time: a.status === "SCHEDULED" ? null : new Intl.DateTimeFormat("es-ES", { timeZone: "Europe/Madrid", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(d),
    competition,
    round: competition === "laliga" ? `Jornada ${a.matchday}` : a.stage === "LEAGUE_STAGE" ? `Fase liga · jornada ${a.matchday}` : (STAGE[a.stage] ?? a.stage),
    opponent: clean(rival.name),
    venue: home ? "home" : "away",
    status,
    score: h !== null && w !== null && status !== "upcoming" ? ((home ? [h, w] : [w, h]) as [number, number]) : null,
  };
}

/** Partidos de la temporada: la API manda, y los datos locales ponen nombres y rondas en español y conservan los ids. */
export async function getMatches(): Promise<Match[]> {
  const data = await api<{ matches: ApiMatch[] }>(`/teams/${TEAM_ID}/matches?season=${SEASON}`);
  const live = (data?.matches ?? []).map(toMatch).filter((m): m is Match => m !== null);
  if (live.length === 0) return MATCHES;

  const local = new Map(MATCHES.map((m) => [`${m.competition}|${m.date}`, m]));
  const merged = live.map((m) => {
    const l = local.get(`${m.competition}|${m.date}`);
    return l ? { ...m, id: l.id, round: l.round, opponent: l.opponent } : m;
  });
  const covered = new Set(live.map((m) => m.competition));
  return [...merged, ...MATCHES.filter((m) => !covered.has(m.competition))].sort((a, b) => a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? ""));
}

/** Posición y puntos en LaLiga (si la API no responde, se usa LEAGUE de src/data/stats.ts). */
export async function getLeague() {
  const data = await api<{ standings: { type: string; table: { position: number; points: number; playedGames: number; team: ApiTeam }[] }[] }>("/competitions/PD/standings");
  const row = data?.standings?.find((s) => s.type === "TOTAL")?.table.find((r) => r.team.id === TEAM_ID);
  return row ? { position: row.position, points: row.points, played: row.playedGames } : LEAGUE;
}
