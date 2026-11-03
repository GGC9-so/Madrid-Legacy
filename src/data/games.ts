import { Search, Star, Quote, LayoutGrid, Trophy, CalendarClock, Shirt, Scale, ListOrdered, Goal, type LucideIcon } from "lucide-react";

export interface Game { slug: string; title: string; text: string; icon: LucideIcon; ready: boolean }

export const GAMES: Game[] = [
  { slug: "adivina-el-jugador", title: "Adivina el jugador", text: "Tres pistas, cuatro nombres. Cuantas menos pistas uses, más puntos.", icon: Search, ready: true },
  { slug: "adivina-el-fichaje", title: "Adivina el fichaje", text: "Reconoce al fichaje histórico por su época, su procedencia y su legado.", icon: Star, ready: true },
  { slug: "quien-lo-dijo", title: "¿Quién lo dijo?", text: "Frases en primera persona de leyendas del club. ¿Sabes de quién son?", icon: Quote, ready: true },
  { slug: "alineacion-historica", title: "Completa la alineación histórica", text: "Falta un jugador en el once de una gran final. ¿Quién es?", icon: LayoutGrid, ready: true },
  { slug: "quiz-de-titulos", title: "Quiz de títulos", text: "Copas, Ligas y finales: demuestra cuánta historia sabes.", icon: Trophy, ready: true },
  { slug: "en-que-ano-paso", title: "¿En qué año pasó?", text: "Ubica los grandes hitos del club en el tiempo.", icon: CalendarClock, ready: true },
  { slug: "jugador-dorsal", title: "Conecta jugador con dorsal", text: "Une a cada jugador con su número.", icon: Shirt, ready: true },
  { slug: "mas-o-menos", title: "Más o menos", text: "¿Más o menos goles, títulos o millones? Elige bien.", icon: Scale, ready: true },
  { slug: "ordena-el-11", title: "Ordena el 11 histórico", text: "Coloca a cada leyenda en su sitio del campo.", icon: ListOrdered, ready: true },
  { slug: "penaltis", title: "Penaltis", text: "Elige esquina y marca el gol de la victoria.", icon: Goal, ready: true },
];

export const getGame = (slug: string) => GAMES.find((g) => g.slug === slug);
