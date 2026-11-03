// Busca automáticamente el resumen oficial de un partido en YouTube (API de datos v3).
// Sin YOUTUBE_API_KEY no hace nada y la web usa solo los enlaces manuales de src/data/videos.ts.
// Cada búsqueda cuesta 100 unidades de la cuota gratuita (10.000 al día) y el resultado se guarda 24 horas.
import type { Match } from "@/data/matches";
import { VIDEOS, youtubeId } from "@/data/videos";

const CHANNEL: Record<Match["competition"], RegExp> = { laliga: /laliga/i, ucl: /uefa|champions/i };
const STOP = /^(real|club|madrid|del|fc|cf)$/i;
const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

interface YtItem { id: { videoId: string }; snippet: { title: string; channelTitle: string } }

export async function findSummary(m: Match): Promise<string | null> {
  const manual = VIDEOS[m.id] ? youtubeId(VIDEOS[m.id]) : null;
  if (manual) return manual;

  const key = process.env.YOUTUBE_API_KEY;
  if (!key || m.status !== "finished") return null;

  const home = m.venue === "home" ? "Real Madrid" : m.opponent;
  const away = m.venue === "home" ? m.opponent : "Real Madrid";
  const q = m.competition === "ucl" ? `highlights ${home} ${away} UEFA Champions League` : `RESUMEN ${home} ${away} LALIGA`;
  const params = new URLSearchParams({ part: "snippet", type: "video", maxResults: "8", q, publishedAfter: `${m.date}T00:00:00Z`, key });
  const tokens = m.opponent.split(/\s+/).filter((t) => t.length >= 3 && !STOP.test(t)).map(norm);

  try {
    const res = await fetch(`https://www.googleapis.com/youtube/v3/search?${params}`, { next: { revalidate: 86400 } });
    if (!res.ok) return null;
    const data = (await res.json()) as { items?: YtItem[] };
    const hit = (data.items ?? []).find((it) => {
      const title = norm(it.snippet.title);
      return CHANNEL[m.competition].test(it.snippet.channelTitle) && /resumen|highlights|summary|resumo/.test(title) && tokens.some((t) => title.includes(t));
    });
    return hit?.id.videoId ?? null;
  } catch {
    return null;
  }
}
