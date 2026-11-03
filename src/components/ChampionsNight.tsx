"use client";

import { useEffect, useState } from "react";
import type { Match } from "@/data/matches";
import { todayKey } from "@/lib/dates";

export default function ChampionsNight({ matches }: { matches: Match[] }) {
  const [match, setMatch] = useState<Match | null>(null);

  useEffect(() => {
    const m = matches.find((x) => x.competition === "ucl" && x.date === todayKey()) ?? null;
    setMatch(m);
    if (m) document.documentElement.dataset.champions = "1";
    return () => { delete document.documentElement.dataset.champions; };
  }, [matches]);

  if (!match) return null;
  const home = match.venue === "home";
  return (
    <div className="border-b border-gold/40 bg-night px-4 py-2 text-center text-sm text-gold-light">
      <strong className="text-gold">Noche de Champions.</strong>{" "}
      Hoy juega {home ? `el Madrid contra ${match.opponent}` : `${match.opponent} contra el Madrid`}{match.time ? `, a las ${match.time} h (España)` : ""}. ¡Hala Madrid!
    </div>
  );
}
