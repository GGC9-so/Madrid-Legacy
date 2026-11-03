// Todo el contenido editable de la portada vive aquí.
import { Users, LayoutGrid, Star, Swords, CalendarDays, Gamepad2, TrendingUp, Newspaper, Flame, BookOpen, Target, Award, Trophy, Scale, type LucideIcon } from "lucide-react";

export const SITE = {
  name: "Madrid Legacy",
  tagline: "El archivo vivo de la historia blanca",
  url: "https://madrid-legacy.vercel.app",
};

export const NAV = [
  { href: "/squad", label: "Plantilla" },
  { href: "/ideal-xi", label: "11 Ideal" },
  { href: "/signings", label: "Fichajes" },
  { href: "/torneo", label: "Torneo" },
  { href: "/calendar", label: "Calendario" },
  { href: "/stats", label: "Estadísticas" },
  { href: "/news", label: "Noticias" },
  { href: "/history", label: "Historia" },
  { href: "/legends", label: "Leyendas" },
  { href: "/games", label: "Minijuegos" },
];

export const QUICK_LINKS: { href: string; title: string; text: string; icon: LucideIcon }[] = [
  { href: "/squad", title: "Plantilla", text: "Todos los jugadores del primer equipo, filtrados por posición.", icon: Users },
  { href: "/ideal-xi", title: "11 Ideal", text: "Elige la formación y coloca a tus titulares. Se guarda en tu navegador.", icon: LayoutGrid },
  { href: "/signings", title: "Fichajes", text: "Los traspasos que cambiaron la historia del club.", icon: Star },
  { href: "/copas", title: "Las 15 Copas", text: "Recorre cada final de Copa de Europa, de 1956 a 2024.", icon: Trophy },
  { href: "/torneo", title: "Torneo de Leyendas", text: "Una eliminatoria de leyendas y un solo campeón: el tuyo.", icon: Swords },
  { href: "/stats", title: "Estadísticas", text: "Goleadores, asistentes y los números de la temporada en curso.", icon: TrendingUp },
  { href: "/comparador", title: "Comparador", text: "Dos jugadores cara a cara en un gráfico de radar.", icon: Scale },
  { href: "/games", title: "Minijuegos", text: "Diez retos para demostrar cuánto sabes del Madrid.", icon: Gamepad2 },
  { href: "/daily", title: "Reto del Día", text: "Cinco preguntas nuevas cada día y una racha que cuidar.", icon: Flame },
  { href: "/album", title: "Álbum de cromos", text: "Un sobre gratis al día con cartas de leyendas del club.", icon: BookOpen },
  { href: "/predict", title: "Predice el marcador", text: "Pon tu resultado antes de cada partido y suma puntos.", icon: Target },
  { href: "/carnet", title: "Carné de madridista", text: "Tu nivel, tu racha y tus récords, de Cantera a Leyenda.", icon: Award },
];

// Años de las 15 Copas de Europa.
export const EUROPEAN_CUPS = [1956, 1957, 1958, 1959, 1960, 1966, 1998, 2000, 2002, 2014, 2016, 2017, 2018, 2022, 2024];

// Revisa estas cifras cuando el club gane un título nuevo.
export const TROPHIES = [
  { label: "Copas de Europa", count: 15 },
  { label: "Ligas", count: 36 },
  { label: "Copas del Rey", count: 20 },
  { label: "Supercopas de España", count: 13 },
  { label: "Supercopas de Europa", count: 6 },
  { label: "Mundiales de Clubes", count: 5 },
];

export const HIGHLIGHTS = [
  { title: "Las noches europeas", text: "Eliminatorias, goles y datos de cada ronda de Champions, partido a partido." },
  { title: "El Clásico", text: "Historial, protagonistas y cada resultado de la temporada frente al Barça." },
  { title: "La plantilla", text: "Fichas con dorsal, posición y datos clave, listas para actualizar cuando cambie el equipo." },
];
