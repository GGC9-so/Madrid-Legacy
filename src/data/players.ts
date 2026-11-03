// Plantilla 2026/27 (dorsales oficiales). Para fichajes o salidas, edita esta lista.
export type Position = "POR" | "DEF" | "MED" | "DEL";

export interface Player {
  slug: string;
  name: string;
  short: string;
  number: number;
  position: Position;
  country: string;
  bio: string;
}

export const POSITIONS: { id: Position; label: string; plural: string }[] = [
  { id: "POR", label: "Portero", plural: "Porteros" },
  { id: "DEF", label: "Defensa", plural: "Defensas" },
  { id: "MED", label: "Mediocentro", plural: "Medios" },
  { id: "DEL", label: "Delantero", plural: "Delanteros" },
];

export const slugify = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const mk = (number: number, name: string, position: Position, country: string, bio: string, short?: string): Player => ({
  slug: slugify(name),
  number,
  name,
  short: short ?? name.split(" ").pop()!,
  position,
  country,
  bio,
});

export const PLAYERS: Player[] = [
  mk(1, "Thibaut Courtois", "POR", "Bélgica", "Portero belga de referencia mundial y figura en las Champions de 2022 y 2024."),
  mk(13, "Andriy Lunin", "POR", "Ucrania", "Portero ucraniano, una segunda opción de máxima confianza bajo palos."),
  mk(2, "Raúl Asencio", "DEF", "España", "Central de La Fábrica que dio el salto al primer equipo en 2024 y ahora hereda el 2."),
  mk(3, "Éder Militão", "DEF", "Brasil", "Central brasileño, campeón de Europa con el club en 2022 y 2024."),
  mk(4, "Dean Huijsen", "DEF", "España", "Central español que llegó en 2025 y esta temporada hereda el 4 de Alaba."),
  mk(12, "Trent Alexander-Arnold", "DEF", "Inglaterra", "Lateral derecho inglés, llegado en 2025 con fama de pasador excepcional.", "Trent"),
  mk(16, "Ibrahima Konaté", "DEF", "Francia", "Central francés, nuevo fichaje para la temporada 2026/27."),
  mk(17, "Marc Cucurella", "DEF", "España", "Lateral izquierdo español, nuevo fichaje para la temporada 2026/27."),
  mk(18, "Álvaro Carreras", "DEF", "España", "Lateral izquierdo formado en La Fábrica que regresó al club en 2025."),
  mk(22, "Antonio Rüdiger", "DEF", "Alemania", "Central alemán, líder de la zaga y campeón de Europa en 2022 y 2024."),
  mk(23, "Ferland Mendy", "DEF", "Francia", "Lateral izquierdo francés, campeón de Europa en 2022 y 2024."),
  mk(24, "Denzel Dumfries", "DEF", "Países Bajos", "Lateral derecho neerlandés, llegado del Inter de Milán con contrato hasta 2030."),
  mk(5, "Jude Bellingham", "MED", "Inglaterra", "Mediocentro inglés, motor del equipo desde su llegada en 2023."),
  mk(6, "Eduardo Camavinga", "MED", "Francia", "Mediocentro francés, versátil y campeón de Europa en 2022 y 2024."),
  mk(8, "Federico Valverde", "MED", "Uruguay", "Centrocampista uruguayo, el pulmón del equipo y campeón de Europa en 2022 y 2024."),
  mk(14, "Aurélien Tchouaméni", "MED", "Francia", "Mediocentro francés, ancla del centro del campo desde 2022."),
  mk(15, "Arda Güler", "MED", "Turquía", "Mediapunta turco de técnica exquisita, llegó en 2023."),
  mk(20, "Bernardo Silva", "MED", "Portugal", "Centrocampista portugués, llega del Manchester City para 2026/27.", "Bernardo"),
  mk(27, "Thiago Pitarch", "MED", "España", "Canterano que sube al primer equipo con el dorsal 27 que llevó Casillas.", "Thiago"),
  mk(7, "Vinícius Júnior", "DEL", "Brasil", "Extremo brasileño, protagonista en las finales europeas de 2022 y 2024.", "Vinícius"),
  mk(9, "Endrick", "DEL", "Brasil", "Delantero brasileño que recupera el 9 tras su cesión en el Olympique de Lyon."),
  mk(10, "Kylian Mbappé", "DEL", "Francia", "Delantero francés, llegó en 2024 y hereda el mítico 10."),
  mk(11, "Rodrygo", "DEL", "Brasil", "Delantero brasileño, especialista en goles decisivos en Champions."),
  mk(19, "Carlos Espí", "DEL", "España", "Delantero español, nuevo fichaje para la temporada 2026/27."),
  mk(21, "Brahim Díaz", "DEL", "Marruecos", "Mediapunta marroquí de regate y desborde, con el dorsal 21.", "Brahim"),
  mk(25, "Yan Diomandé", "DEL", "Costa de Marfil", "Extremo marfileño, el fichaje más caro de la historia del club (más de 120 M€)."),
];

export const getPlayer = (slug: string) => PLAYERS.find((p) => p.slug === slug);
export const positionLabel = (id: Position) => POSITIONS.find((p) => p.id === id)!.label;
