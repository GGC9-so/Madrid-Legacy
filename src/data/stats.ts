// Estadísticas individuales de LaLiga 2026/27. Actualiza los números y la fecha tras cada jornada.
export const STATS_META = { scope: "LaLiga", upTo: "la jornada 11 (1 de noviembre de 2026)" };

// slug del jugador (ver src/data/players.ts), goles y asistencias
export const PLAYER_STATS: { slug: string; goals: number; assists: number }[] = [
  { slug: "kylian-mbappe", goals: 12, assists: 2 },
  { slug: "jude-bellingham", goals: 4, assists: 3 },
  { slug: "arda-guler", goals: 2, assists: 2 },
  { slug: "yan-diomande", goals: 3, assists: 2 },
  { slug: "carlos-espi", goals: 2, assists: 0 },
  { slug: "vinicius-junior", goals: 1, assists: 3 },
  { slug: "alvaro-carreras", goals: 1, assists: 0 },
  { slug: "antonio-rudiger", goals: 1, assists: 0 },
  { slug: "federico-valverde", goals: 0, assists: 2 },
  { slug: "aurelien-tchouameni", goals: 0, assists: 1 },
  { slug: "trent-alexander-arnold", goals: 0, assists: 1 },
  { slug: "bernardo-silva", goals: 0, assists: 1 },
  { slug: "eduardo-camavinga", goals: 0, assists: 1 },
];

// Clasificación de LaLiga (actualízala tras cada jornada)
export const LEAGUE = { position: 3, points: 27, played: 11 };
