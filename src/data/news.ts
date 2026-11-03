// Noticias del club. Añade las nuevas arriba del todo (o en cualquier posición: se ordenan por fecha).
export type NewsTag = "Partidos" | "Fichajes" | "Club";
export interface NewsPost { id: string; date: string; tag: NewsTag; title: string; summary: string }

const NEWS: NewsPost[] = [
  { id: "racing", date: "2026-11-01", tag: "Partidos", title: "Sexta victoria seguida: 0-3 al Racing en El Sardinero", summary: "Mbappé de penalti, Bellingham y Diomande marcaron antes del descanso. El Madrid sigue tercero con 27 puntos, a tres del Barcelona." },
  { id: "clasico", date: "2026-10-25", tag: "Partidos", title: "El Madrid gana el Clásico en el Camp Nou: 1-2", summary: "Doblete de Mbappé, en los minutos 41 y 87, para vencer al Barcelona, acabar con su invicto en LaLiga y colocarse a tres puntos del líder." },
  { id: "leipzig", date: "2026-10-21", tag: "Partidos", title: "Cuarta victoria seguida: 4-1 al Leipzig", summary: "El Madrid goleó al RB Leipzig en el Bernabéu en la tercera jornada de la fase liga de la Champions y encadena cuatro triunfos consecutivos." },
  { id: "sevilla", date: "2026-10-18", tag: "Partidos", title: "El Sevilla cae 4-1 en el Bernabéu", summary: "Victoria cómoda en la jornada 9 de LaLiga que deja al equipo con 21 puntos y tercero en la tabla." },
  { id: "roma", date: "2026-10-14", tag: "Partidos", title: "Noche de goles en Roma: 3-4", summary: "El Madrid ganó a la Roma en un partido de ida y vuelta, en la segunda jornada de la fase liga de la Champions." },
  { id: "diomande-gol", date: "2026-10-10", tag: "Partidos", title: "Diomande estrena su cuenta ante el Villarreal", summary: "El extremo marfileño marcó su primer gol con el club en el 1-0 al Villarreal, en un partido en el que Vinícius fue expulsado." },
  { id: "mbappe-hat-trick", date: "2026-08-26", tag: "Partidos", title: "Hat-trick de Mbappé en el estreno en casa", summary: "Mbappé marcó tres goles y Vinícius otro en el 4-1 a la Real Sociedad, primer partido de la temporada en el Bernabéu." },
  { id: "diomande", date: "2026-08-06", tag: "Fichajes", title: "Yan Diomande, nuevo extremo blanco", summary: "Llega desde el RB Leipzig con contrato de siete años, en una operación que según la prensa ronda los 140 millones de euros." },
  { id: "vinicius-2032", date: "2026-08-06", tag: "Club", title: "Vinícius renueva hasta 2032", summary: "El delantero brasileño amplía su contrato y seguirá vinculado al club durante seis temporadas más." },
  { id: "espi", date: "2026-07-30", tag: "Fichajes", title: "Carlos Espí llega desde el Levante", summary: "Contrato hasta 2031 para el delantero español, que marcó en su debut en LaLiga." },
  { id: "dumfries", date: "2026-07-05", tag: "Fichajes", title: "Dumfries firma por cuatro años", summary: "El lateral neerlandés llega desde el Inter de Milán para reforzar la banda derecha." },
  { id: "konate", date: "2026-06-18", tag: "Fichajes", title: "Konaté llega libre desde el Liverpool", summary: "Contrato de cuatro años para el central francés." },
  { id: "bernardo", date: "2026-06-17", tag: "Fichajes", title: "Bernardo Silva, a coste cero", summary: "El centrocampista portugués firma por dos temporadas tras su etapa en el Manchester City." },
  { id: "cucurella", date: "2026-06-15", tag: "Fichajes", title: "Cucurella, primer refuerzo del verano", summary: "El lateral izquierdo llega desde el Chelsea con un contrato de seis años." },
  { id: "mourinho", date: "2026-06-11", tag: "Club", title: "Mourinho vuelve al banquillo", summary: "El técnico portugués regresa al club con contrato hasta 2029." },
  { id: "florentino", date: "2026-06-07", tag: "Club", title: "Florentino Pérez, reelegido presidente", summary: "Ganó las elecciones, las primeras con voto de los socios en dos décadas." },
  { id: "carvajal", date: "2026-05-18", tag: "Club", title: "Carvajal se despide tras 23 años", summary: "El capitán deja el club como uno de los pocos futbolistas de la historia con seis Copas de Europa." },
];

export const POSTS = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
export const TAGS: NewsTag[] = ["Partidos", "Fichajes", "Club"];
