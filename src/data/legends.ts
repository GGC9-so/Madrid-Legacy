import { slugify } from "./players";

export type LegendGroup = "POR" | "DEF" | "MED" | "DEL" | "BAN";
export interface Legend { slug: string; name: string; years: string; role: string; group: LegendGroup; headline: string; bio: string }

const l = (name: string, years: string, role: string, group: LegendGroup, headline: string, bio: string): Legend => ({ slug: slugify(name), name, years, role, group, headline, bio });

// Ordenadas por época. Para añadir una leyenda, copia una línea y cambia los datos.
export const LEGENDS: Legend[] = [
  l("Santiago Bernabéu", "1943–1978", "Presidente", "BAN", "El arquitecto del Madrid moderno.", "Jugó en el club y lo presidió durante 35 años. Bajo su mandato el Madrid ganó las seis primeras Copas de Europa y nació el estadio que hoy lleva su nombre."),
  l("Alfredo Di Stéfano", "1953–1964", "Delantero", "DEL", "La Saeta Rubia.", "Marcó en las cinco finales de Copa de Europa que ganó el club entre 1956 y 1960."),
  l("Francisco Gento", "1953–1971", "Extremo", "DEL", "La Galerna del Cantábrico.", "Es el único jugador de la historia con seis Copas de Europa."),
  l("Raymond Kopa", "1956–1959", "Delantero", "DEL", "El Napoleón del fútbol.", "Ganó el Balón de Oro de 1958 con el club y tres Copas de Europa seguidas (1957, 1958 y 1959)."),
  l("Ferenc Puskás", "1958–1966", "Delantero", "DEL", "El Cañoncito pum.", "Marcó cuatro goles en la final de la Copa de Europa de 1960, el 7-3 al Eintracht Fráncfort."),
  l("Emilio Butragueño", "1984–1995", "Delantero", "DEL", "El Buitre.", "Símbolo de la Quinta del Buitre, el equipo que ganó cinco Ligas seguidas entre 1986 y 1990."),
  l("Fernando Hierro", "1989–2003", "Defensa", "DEF", "Un central con instinto de delantero.", "Capitán y líder de la zaga, campeón de Europa en 1998, 2000 y 2002."),
  l("Raúl González", "1994–2010", "Delantero", "DEL", "El capitán eterno.", "Marcó 323 goles de blanco y ganó tres Copas de Europa (1998, 2000 y 2002)."),
  l("Fernando Redondo", "1994–2000", "Centrocampista", "MED", "La elegancia hecha fútbol.", "Su taconazo en Old Trafford en el año 2000 sigue siendo una de las jugadas más aplaudidas de Europa. Campeón de Europa en 1998 y 2000."),
  l("Roberto Carlos", "1996–2007", "Lateral", "DEF", "El misil de la banda izquierda.", "Ganó tres Champions (1998, 2000 y 2002) en once temporadas de potencia y llegada únicas."),
  l("Predrag Mijatović", "1996–2000", "Delantero", "DEL", "El gol de la Séptima.", "Marcó el 1-0 a la Juventus en la final de Ámsterdam de 1998 y acabó con 32 años de espera."),
  l("Fernando Morientes", "1997–2005", "Delantero", "DEL", "El nueve de las grandes noches.", "Campeón de Europa en 1998, 2000 y 2002."),
  l("Iker Casillas", "1999–2015", "Portero", "POR", "San Iker.", "Portero y capitán: tres Copas de Europa (2000, 2002 y 2014) y cinco Ligas."),
  l("Luis Figo", "2000–2006", "Extremo", "DEL", "El fichaje que sacudió el fútbol español.", "Ganó el Balón de Oro en 2000 y fue una de las primeras piezas de los Galácticos."),
  l("Zinedine Zidane", "2001–2006 y 2016–2021", "Centrocampista y entrenador", "MED", "Magia dentro y fuera del campo.", "Su volea de Glasgow dio la Novena. Desde el banquillo ganó tres Champions seguidas (2016, 2017 y 2018)."),
  l("Ronaldo Nazário", "2002–2007", "Delantero", "DEL", "El Fenómeno.", "Ganó la Copa Intercontinental de 2002 y la Liga 2002/03 con goles inolvidables en el Bernabéu."),
  l("David Beckham", "2003–2007", "Centrocampista", "MED", "Un icono mundial de blanco.", "Llegó en 2003 y se despidió del club con la Liga 2006/07."),
  l("Dani Carvajal", "2003–2026", "Lateral", "DEF", "El canterano que lo ganó todo.", "Canterano y capitán. Ganó seis Copas de Europa y 27 títulos en total antes de despedirse en 2026, tras 23 años en el club."),
  l("Sergio Ramos", "2005–2021", "Defensa", "DEF", "El capitán de las remontadas.", "Autor del cabezazo del minuto 93 en Lisboa 2014 y campeón de Europa en cuatro ocasiones con el club."),
  l("Marcelo", "2007–2022", "Lateral", "DEF", "Samba en la banda izquierda.", "Cinco Copas de Europa (2014, 2016, 2017, 2018 y 2022) con un juego lleno de regate y fantasía."),
  l("Pepe", "2007–2017", "Defensa", "DEF", "Carácter inagotable.", "Defensa portugués de máxima intensidad, campeón de Europa en 2014 y 2016."),
  l("Cristiano Ronaldo", "2009–2018", "Delantero", "DEL", "El goleador más grande de la historia del club.", "Marcó 450 goles en 438 partidos y ganó cuatro Champions y cuatro Balones de Oro con la camiseta blanca."),
  l("Karim Benzema", "2009–2023", "Delantero", "DEL", "De socio de Cristiano a Balón de Oro.", "Marcó 354 goles, ganó cinco Champions y fue Balón de Oro en 2022."),
  l("Nacho Fernández", "2009–2024", "Defensa", "DEF", "El canterano que nunca falló.", "Ganó seis Copas de Europa defendiendo cualquier puesto de la zaga."),
  l("Raphaël Varane", "2011–2021", "Defensa", "DEF", "Elegancia y velocidad en la zaga.", "Cuatro Copas de Europa (2014, 2016, 2017 y 2018) antes de despedirse en 2021."),
  l("Luka Modrić", "2012–2025", "Centrocampista", "MED", "El cerebro eterno.", "Seis Champions, el Balón de Oro de 2018 y trece temporadas de fútbol de seda."),
  l("Casemiro", "2013–2022", "Centrocampista", "MED", "El ancla del equipo.", "Cinco Copas de Europa (2014, 2016, 2017, 2018 y 2022) protegiendo la defensa."),
  l("Carlo Ancelotti", "2013–2015 y 2021–2025", "Entrenador", "BAN", "El técnico de la Décima.", "Dirigió al equipo en las Champions de 2014, 2022 y 2024."),
  l("Toni Kroos", "2014–2024", "Centrocampista", "MED", "El metrónomo.", "Cinco Champions (2016, 2017, 2018, 2022 y 2024) marcando el ritmo con cada pase."),
  l("Keylor Navas", "2014–2019", "Portero", "POR", "El portero de las tres Champions.", "Bajo palos en las Champions de 2016, 2017 y 2018."),
  l("Dani Ceballos", "2017–2026", "Centrocampista", "MED", "Nueve años de blanco.", "Se marchó en 2026 tras nueve temporadas y quince títulos con el club."),
  l("Thibaut Courtois", "2018–", "Portero", "POR", "El muro de París.", "Su actuación en la final de 2022 ante el Liverpool, con paradas imposibles, pasó directo a la historia."),
  l("Vinícius Júnior", "2018–", "Delantero", "DEL", "El futbolista de las finales.", "Marcó el gol de la final de París 2022 y volvió a marcar en Wembley en 2024. Renovó hasta 2032."),
  l("David Alaba", "2021–2026", "Defensa", "DEF", "Versatilidad de campeón.", "Cinco temporadas, dos Champions (2022 y 2024) y once títulos con el club."),
];
