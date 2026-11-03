import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";
import { PLAYERS } from "@/data/players";
import { SIGNINGS } from "@/data/signings";
import { GAMES } from "@/data/games";

const FIXED = ["", "/squad", "/ideal-xi", "/signings", "/torneo", "/calendar", "/stats", "/comparador", "/creditos", "/news", "/history", "/legends", "/stadium", "/moments", "/games", "/daily", "/album", "/predict", "/carnet", "/copas"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...FIXED, ...PLAYERS.map((p) => `/squad/${p.slug}`), ...SIGNINGS.map((s) => `/signings/${s.slug}`), ...GAMES.map((g) => `/games/${g.slug}`)];
  return paths.map((path) => ({ url: `${SITE.url}${path}` }));
}
