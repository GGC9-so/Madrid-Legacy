export interface Copa { n: number; year: number; nick: string; city: string; rival: string; score: string; note?: string; scorers: string; story: string }

export const COPAS: Copa[] = [
  { n: 1, year: 1956, nick: "La primera", city: "París", rival: "Stade de Reims", score: "4-3", scorers: "Di Stéfano, Rial (2) y Marquitos", story: "Remontada en París ante el Stade de Reims: arranca la dinastía europea." },
  { n: 2, year: 1957, nick: "La segunda", city: "Madrid", rival: "Fiorentina", score: "2-0", scorers: "Di Stéfano (p.) y Gento", story: "Una final jugada en casa, con el Bernabéu como testigo." },
  { n: 3, year: 1958, nick: "La tercera", city: "Bruselas", rival: "AC Milan", score: "3-2", note: "Tras la prórroga", scorers: "Di Stéfano, Rial y Gento", story: "Hizo falta la prórroga para vencer al Milan; Gento marcó el gol decisivo." },
  { n: 4, year: 1959, nick: "La cuarta", city: "Stuttgart", rival: "Stade de Reims", score: "2-0", scorers: "Mateos y Di Stéfano", story: "Revancha ante el Stade de Reims y cuarta Copa consecutiva." },
  { n: 5, year: 1960, nick: "La quinta", city: "Glasgow", rival: "Eintracht Fráncfort", score: "7-3", scorers: "Puskás (4) y Di Stéfano (3)", story: "Hampden Park vio una de las mejores finales de la historia: cinco Copas seguidas." },
  { n: 6, year: 1966, nick: "La sexta", city: "Bruselas", rival: "Partizan", score: "2-1", scorers: "Amancio y Serena", story: "La Copa del Madrid yé-yé, una generación de jugadores españoles con Gento de capitán." },
  { n: 7, year: 1998, nick: "La Séptima", city: "Ámsterdam", rival: "Juventus", score: "1-0", scorers: "Mijatović", story: "Mijatović rompió 32 años de espera." },
  { n: 8, year: 2000, nick: "La Octava", city: "París", rival: "Valencia", score: "3-0", scorers: "Morientes, McManaman y Raúl", story: "La primera final de la Copa de Europa entre dos equipos del mismo país." },
  { n: 9, year: 2002, nick: "La Novena", city: "Glasgow", rival: "Bayer Leverkusen", score: "2-1", scorers: "Raúl y Zidane", story: "En el año del centenario llegó la volea de Zidane." },
  { n: 10, year: 2014, nick: "La Décima", city: "Lisboa", rival: "Atlético de Madrid", score: "4-1", note: "Tras la prórroga", scorers: "Ramos, Bale, Marcelo y Cristiano (p.)", story: "Ramos igualó en el minuto 93 y la prórroga hizo el resto." },
  { n: 11, year: 2016, nick: "La Undécima", city: "Milán", rival: "Atlético de Madrid", score: "1-1", note: "Ganó en los penaltis (5-3)", scorers: "Ramos (y Cristiano en la tanda)", story: "Otra final contra el Atlético, esta vez resuelta desde los once metros." },
  { n: 12, year: 2017, nick: "La Duodécima", city: "Cardiff", rival: "Juventus", score: "4-1", scorers: "Cristiano (2), Casemiro y Asensio", story: "El Madrid fue el primero de la era Champions en revalidar el título." },
  { n: 13, year: 2018, nick: "La Decimotercera", city: "Kiev", rival: "Liverpool", score: "3-1", scorers: "Benzema y Bale (2)", story: "Tercera Champions consecutiva, con la chilena de Bale como imagen." },
  { n: 14, year: 2022, nick: "La Decimocuarta", city: "París", rival: "Liverpool", score: "1-0", scorers: "Vinícius", story: "Una temporada de remontadas ante PSG, Chelsea y Manchester City, culminada en París." },
  { n: 15, year: 2024, nick: "La Decimoquinta", city: "Londres", rival: "Borussia Dortmund", score: "2-0", scorers: "Carvajal y Vinícius", story: "Carvajal y Vinícius sentenciaron en Wembley para llegar a 15." },
];
