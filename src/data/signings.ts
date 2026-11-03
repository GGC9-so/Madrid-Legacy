// Ranking editorial (el orden del array ES el ranking). Impacto y legado son puntuaciones 0-100 editables.
import { slugify, type Position } from "./players";

export interface Signing {
  slug: string;
  name: string;
  year: number;
  from: string;
  position: Position;
  impact: number;
  legacy: number;
  headline: string;
  story: string;
}

const s = (name: string, year: number, from: string, position: Position, impact: number, legacy: number, headline: string, story: string): Signing => ({
  slug: slugify(name), name, year, from, position, impact, legacy, headline, story,
});

export const SIGNINGS: Signing[] = [
  s("Alfredo Di Stéfano", 1953, "Millonarios", "DEL", 99, 100, "La Saeta Rubia que fundó la leyenda europea.", "Llegó en 1953 y fue el motor de las cinco Copas de Europa consecutivas (1956-1960). Cambió la dimensión del club para siempre."),
  s("Cristiano Ronaldo", 2009, "Manchester United", "DEL", 100, 98, "El goleador más prolífico de la historia del club.", "Marcó 450 goles de blanco, ganó cuatro Champions (2014, 2016, 2017 y 2018) y convirtió cada noche europea en un acontecimiento."),
  s("Zinedine Zidane", 2001, "Juventus", "MED", 96, 97, "Un fichaje récord que respondió con una obra de arte.", "Costó una cifra récord y selló su paso con la volea de Hampden en la final de 2002, una de las más recordadas de la Champions."),
  s("Ferenc Puskás", 1958, "Honvéd", "DEL", 92, 93, "El Cañoncito pum llegó para completar un equipo imbatible.", "Formó dúo con Di Stéfano y marcó cuatro goles en la final de la Copa de Europa de 1960, el 7-3 al Eintracht Fráncfort."),
  s("Sergio Ramos", 2005, "Sevilla", "DEF", 94, 95, "El central capitán que vivió cada final con el alma.", "Su cabezazo en el minuto 93 de la final de Lisboa 2014 abrió la puerta a La Décima. Fue capitán y símbolo de toda una era."),
  s("Luka Modrić", 2012, "Tottenham", "MED", 93, 94, "El cerebro eterno del mediocampo.", "Ganó seis Champions con el club, el Balón de Oro 2018 y marcó el ritmo del equipo durante más de una década."),
  s("Karim Benzema", 2009, "Olympique de Lyon", "DEL", 94, 92, "De socio de Cristiano a Balón de Oro.", "Marcó 354 goles, es el segundo máximo goleador de la historia del club y fue Balón de Oro en 2022."),
  s("Luis Figo", 2000, "FC Barcelona", "DEL", 88, 85, "El fichaje que sacudió el fútbol español.", "Llegó en el verano de 2000, ganó el Balón de Oro ese mismo año y fue una de las primeras piezas de los Galácticos."),
  s("Ronaldo Nazário", 2002, "Inter de Milán", "DEL", 90, 88, "El Fenómeno, en estado puro.", "Ganó la Copa Intercontinental de 2002 y la Liga 2002/03, y dejó goles inolvidables en el Bernabéu."),
  s("Roberto Carlos", 1996, "Inter de Milán", "DEF", 89, 90, "El lateral que reinventó la banda izquierda.", "Ganó tres Champions (1998, 2000 y 2002) y durante once temporadas fue un lateral de potencia y llegada únicas."),
  s("Gareth Bale", 2013, "Tottenham", "DEL", 86, 84, "Goles que decidieron finales.", "Marcó en la final de Lisboa 2014 y firmó la chilena de Kiev 2018 contra el Liverpool, dos de los goles más recordados del club en Europa."),
  s("Jude Bellingham", 2023, "Borussia Dortmund", "MED", 88, 78, "Un debut de ensueño que ya es historia.", "Llegó en 2023 y fue clave en la Liga y la Champions de 2023/24. Su legado todavía se está escribiendo."),
  s("Kylian Mbappé", 2024, "Paris Saint-Germain", "DEL", 85, 70, "La estrella mundial que eligió el Bernabéu.", "Llegó libre en 2024 desde el PSG, tras años siendo el gran objetivo del club. Esta temporada hereda el dorsal 10."),
];

export const getSigning = (slug: string) => SIGNINGS.find((x) => x.slug === slug);
