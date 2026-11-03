// Alineaciones y sucesos por partido. La clave es el "id" del partido en matches.json.
// Cada fila de "rows" va del portero al ataque y, dentro de la fila, de izquierda a derecha según el propio equipo.
// Si no se conoce el minuto de un suceso, usa "". Si no se conoce el once rival, deja "rows: []".
export interface LPlayer { name: string; number?: number; slug?: string; captain?: boolean }
export interface TeamLineup { name: string; formation: string; kit: string; kitText: string; rows: LPlayer[][] }
export type EventType = "goal" | "yellow" | "red" | "sub";
export interface MatchEvent { minute: string; team: "rm" | "opp"; type: EventType; player: string; assist?: string; out?: string; note?: string }
export interface MatchReport { stadium?: string; referee?: string; rm: TeamLineup; opp: TeamLineup; events: MatchEvent[] }

const p = (name: string, number: number, slug: string, captain = false): LPlayer => ({ name, number, slug, ...(captain ? { captain } : {}) });
const R = {
  courtois: p("Courtois", 1, "thibaut-courtois"), valverde: p("Valverde", 8, "federico-valverde", true), rudiger: p("Rüdiger", 22, "antonio-rudiger"),
  huijsen: p("Huijsen", 4, "dean-huijsen"), carreras: p("Carreras", 18, "alvaro-carreras"), camavinga: p("Camavinga", 6, "eduardo-camavinga"),
  silva: p("Silva", 20, "bernardo-silva"), vinicius: p("Vinícius", 7, "vinicius-junior"), bellingham: p("Bellingham", 5, "jude-bellingham"),
  guler: p("Güler", 15, "arda-guler"), mbappe: p("Mbappé", 10, "kylian-mbappe"), cucurella: p("Cucurella", 17, "marc-cucurella"),
  konate: p("Konaté", 16, "ibrahima-konate"), tchouameni: p("Tchouaméni", 14, "aurelien-tchouameni"), diomande: p("Diomande", 25, "yan-diomande"),
  endrick: p("Endrick", 9, "endrick"), dumfries: p("Dumfries", 24, "denzel-dumfries"), trent: p("Trent", 12, "trent-alexander-arnold"), lunin: p("Lunin", 13, "andriy-lunin"), brahim: p("Brahim", 21, "brahim-diaz"), espi: p("Espí", 19, "carlos-espi"),
};
const o = (name: string, number?: number, captain = false): LPlayer => ({ name, ...(number ? { number } : {}), ...(captain ? { captain } : {}) });
const rm = (formation: string, rows: LPlayer[][]): TeamLineup => ({ name: "Real Madrid", formation, kit: "#FFFFFF", kitText: "#0B1F3A", rows });

export const REPORTS: Record<string, MatchReport> = {
  "j10-barcelona": {
    stadium: "Spotify Camp Nou",
    referee: "Juan Martínez Munuera",
    rm: rm("4-2-3-1", [[R.lunin], [R.cucurella, R.huijsen, R.konate, R.valverde], [R.tchouameni, R.silva], [R.diomande, R.bellingham, R.guler], [R.mbappe]]),
    opp: {
      name: "FC Barcelona", formation: "4-3-3", kit: "#1E4FA8", kitText: "#FFFFFF",
      rows: [[o("García", 1)], [o("Cancelo", 2), o("Martín", 18), o("Cubarsí", 5), o("Espart", 12)], [o("Pedri", 8), o("Rodri", 16), o("Fermín", 7)], [o("Gordon", 17), o("Raphinha", 11, true), o("Yamal", 10)]],
    },
    events: [
      { minute: "41'", team: "rm", type: "goal", player: "Mbappé" },
      { minute: "46'", team: "rm", type: "yellow", player: "Tchouaméni" },
      { minute: "61'", team: "opp", type: "goal", player: "Raphinha", assist: "Pedri" },
      { minute: "62'", team: "rm", type: "sub", player: "Dumfries", out: "Valverde" },
      { minute: "84'", team: "opp", type: "yellow", player: "Gordon" },
      { minute: "87'", team: "rm", type: "goal", player: "Mbappé", assist: "Camavinga" },
      { minute: "90+2'", team: "rm", type: "yellow", player: "Huijsen" },
      { minute: "90+5'", team: "rm", type: "yellow", player: "Mbappé" },
      { minute: "90+7'", team: "opp", type: "yellow", player: "Balde" },
      { minute: "90+7'", team: "opp", type: "yellow", player: "Adeyemi" },
    ],
  },

  "ucl3-leipzig": {
    stadium: "Santiago Bernabéu",
    rm: rm("4-2-3-1", [[R.courtois], [R.carreras, R.huijsen, R.rudiger, R.valverde], [R.camavinga, R.silva], [R.vinicius, R.bellingham, R.guler], [R.mbappe]]),
    opp: {
      name: "RB Leipzig", formation: "4-2-3-1", kit: "#D01F2F", kitText: "#FFFFFF",
      rows: [[o("Vandervoordt")], [o("Raum"), o("Lukeba"), o("Orban"), o("Baku")], [o("Seiwald"), o("El Aynaoui")], [o("Nusa"), o("Nkunku"), o("Gruda")], [o("Cardoso")]],
    },
    events: [
      { minute: "44'", team: "rm", type: "goal", player: "Silva", assist: "Güler" },
      { minute: "52'", team: "rm", type: "goal", player: "Güler", assist: "Mbappé" },
      { minute: "", team: "rm", type: "yellow", player: "Carreras" },
      { minute: "", team: "rm", type: "sub", player: "Cucurella", out: "Carreras" },
      { minute: "", team: "rm", type: "sub", player: "Brahim", out: "Güler" },
      { minute: "", team: "rm", type: "sub", player: "Diomande", out: "Vinícius" },
      { minute: "83'", team: "rm", type: "goal", player: "Mbappé" },
      { minute: "85'", team: "opp", type: "goal", player: "Gomis" },
      { minute: "87'", team: "rm", type: "goal", player: "Diomande" },
    ],
  },

  "j9-sevilla": {
    stadium: "Santiago Bernabéu",
    referee: "Mateo Busquets Ferrer",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.konate, R.valverde], [R.tchouameni, R.guler], [R.diomande, R.bellingham, R.endrick], [R.mbappe]]),
    opp: {
      name: "Sevilla", formation: "4-2-3-1", kit: "#D4202C", kitText: "#FFFFFF",
      rows: [[o("Vlachodimos")], [o("Suazo"), o("Salas"), o("Castrín"), o("Iglesias")], [o("Fofana"), o("Agoumé")], [o("Correia"), o("Fernández"), o("Vargas")], [o("Ure")]],
    },
    events: [
      { minute: "23'", team: "rm", type: "yellow", player: "Huijsen" },
      { minute: "30'", team: "rm", type: "goal", player: "Güler", assist: "Diomande" },
      { minute: "37'", team: "rm", type: "goal", player: "Mbappé", assist: "Bellingham" },
      { minute: "63'", team: "rm", type: "goal", player: "Mbappé", note: "penalti" },
      { minute: "69'", team: "rm", type: "sub", player: "Brahim", out: "Endrick" },
      { minute: "70'", team: "rm", type: "sub", player: "Silva", out: "Bellingham" },
      { minute: "73'", team: "rm", type: "yellow", player: "Cucurella" },
      { minute: "80'", team: "opp", type: "goal", player: "Bueno", assist: "Stassin" },
      { minute: "82'", team: "rm", type: "goal", player: "Diomande", assist: "Tchouaméni" },
    ],
  },

  "ucl2-roma": {
    stadium: "Stadio Olimpico",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.rudiger, R.konate, R.dumfries], [R.valverde, R.tchouameni], [R.vinicius, R.bellingham, R.diomande], [R.mbappe]]),
    opp: {
      name: "AS Roma", formation: "3-4-1-2", kit: "#8E1B2D", kitText: "#F6C945",
      rows: [[o("Gollini")], [o("Hermoso"), o("N'Dicka"), o("Mancini")], [o("Molina"), o("Koné"), o("De Roon"), o("Wesley")], [o("Soulé")], [o("Dybala"), o("Malen")]],
    },
    events: [
      { minute: "20'", team: "opp", type: "goal", player: "De Roon", assist: "Soulé" },
      { minute: "25'", team: "rm", type: "goal", player: "Mbappé", assist: "Diomande" },
      { minute: "51'", team: "opp", type: "goal", player: "Malen" },
      { minute: "57'", team: "opp", type: "goal", player: "Malen" },
      { minute: "60'", team: "opp", type: "yellow", player: "Mancini" },
      { minute: "60'", team: "rm", type: "sub", player: "Güler", out: "Dumfries" },
      { minute: "60'", team: "rm", type: "sub", player: "Endrick", out: "Vinícius" },
      { minute: "70'", team: "opp", type: "yellow", player: "Wesley" },
      { minute: "70'", team: "rm", type: "sub", player: "Silva", out: "Tchouaméni" },
      { minute: "78'", team: "rm", type: "sub", player: "Carreras", out: "Cucurella" },
      { minute: "78'", team: "rm", type: "sub", player: "Espí", out: "Diomande" },
      { minute: "83'", team: "rm", type: "goal", player: "Espí", assist: "Güler" },
      { minute: "85'", team: "rm", type: "goal", player: "Endrick", assist: "Güler", note: "de cabeza" },
      { minute: "89'", team: "opp", type: "yellow", player: "Pellegrini" },
      { minute: "90'", team: "rm", type: "goal", player: "Rüdiger", assist: "Güler" },
      { minute: "90+5'", team: "rm", type: "yellow", player: "Carreras" },
    ],
  },

  "j8-villarreal": {
    stadium: "Santiago Bernabéu",
    referee: "Isidro Díaz de Mera",
    rm: rm("4-2-3-1", [[R.courtois], [R.carreras, R.rudiger, R.konate, R.trent], [R.tchouameni, R.valverde], [R.diomande, R.bellingham, R.guler], [R.mbappe]]),
    opp: { name: "Villarreal", formation: "—", kit: "#F5D400", kitText: "#0B1F3A", rows: [] },
    events: [
      { minute: "10'", team: "opp", type: "yellow", player: "Renato Veiga" },
      { minute: "52'", team: "rm", type: "sub", player: "Vinícius", out: "Trent" },
      { minute: "62'", team: "rm", type: "goal", player: "Diomande", assist: "Valverde" },
      { minute: "72'", team: "rm", type: "red", player: "Vinícius" },
      { minute: "", team: "rm", type: "sub", player: "Camavinga", out: "Güler" },
      { minute: "", team: "rm", type: "sub", player: "Dumfries", out: "Diomande" },
      { minute: "84'", team: "opp", type: "yellow", player: "Pau Navarro" },
    ],
  },

  "j7-atletico": {
    stadium: "Riyadh Air Metropolitano",
    referee: "Javier Alberola Rojas",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.konate, R.dumfries], [R.tchouameni, R.valverde], [R.vinicius, R.bellingham, R.guler], [R.mbappe]]),
    opp: {
      name: "Atlético de Madrid", formation: "5-2-3", kit: "#C8102E", kitText: "#FFFFFF",
      rows: [[o("Oblak")], [o("Grimaldo"), o("Hancko"), o("Pubill"), o("Romero"), o("Llorente")], [o("Johnny"), o("Baena")], [o("David"), o("Kang-in"), o("Simeone")]],
    },
    events: [
      { minute: "35'", team: "opp", type: "yellow", player: "Pubill" },
      { minute: "38'", team: "opp", type: "yellow", player: "Romero" },
      { minute: "49'", team: "rm", type: "yellow", player: "Dumfries" },
      { minute: "52'", team: "rm", type: "red", player: "Huijsen" },
      { minute: "53'", team: "opp", type: "goal", player: "Grimaldo", note: "penalti" },
      { minute: "54'", team: "rm", type: "sub", player: "Diomande", out: "Vinícius" },
      { minute: "54'", team: "rm", type: "sub", player: "Rüdiger", out: "Güler" },
      { minute: "59'", team: "opp", type: "goal", player: "David", assist: "Simeone" },
      { minute: "71'", team: "rm", type: "sub", player: "Camavinga", out: "Tchouaméni" },
      { minute: "78'", team: "rm", type: "yellow", player: "Bellingham" },
      { minute: "82'", team: "rm", type: "sub", player: "Silva", out: "Bellingham" },
      { minute: "89'", team: "rm", type: "goal", player: "Rüdiger", assist: "Silva", note: "de cabeza" },
    ],
  },

  "j2-espanyol": {
    stadium: "RCDE Stadium",
    rm: rm("4-2-3-1", [[R.courtois], [R.carreras, R.huijsen, R.konate, R.dumfries], [R.valverde, R.silva], [R.vinicius, R.bellingham, R.guler], [R.mbappe]]),
    opp: {
      name: "Espanyol", formation: "4-4-2", kit: "#2E6FD8", kitText: "#FFFFFF",
      rows: [[o("Dmitrović", 13)], [o("Hinojo", 21), o("Riedel", 5), o("Núñez", 14), o("El Hilali", 23)], [o("Dolan", 24), o("Javi H.", 28), o("Edu Expósito", 8), o("Urko", 4)], [o("Cala", 22), o("Roberto", 9)]],
    },
    events: [
      { minute: "9'", team: "rm", type: "goal", player: "Bellingham", assist: "Güler", note: "de cabeza" },
      { minute: "30'", team: "opp", type: "goal", player: "Cala", assist: "Javi H." },
      { minute: "32'", team: "rm", type: "yellow", player: "Vinícius" },
      { minute: "32'", team: "opp", type: "yellow", player: "Cala" },
      { minute: "59'", team: "opp", type: "yellow", player: "Riedel" },
      { minute: "64'", team: "rm", type: "sub", player: "Cucurella", out: "Carreras" },
      { minute: "64'", team: "rm", type: "sub", player: "Diomande", out: "Güler" },
      { minute: "75'", team: "opp", type: "sub", player: "Lozano", out: "Urko" },
      { minute: "80'", team: "rm", type: "sub", player: "Trent", out: "Dumfries" },
      { minute: "80'", team: "rm", type: "sub", player: "Camavinga", out: "Silva" },
      { minute: "80'", team: "rm", type: "sub", player: "Espí", out: "Bellingham" },
      { minute: "84'", team: "opp", type: "yellow", player: "Edu Expósito" },
      { minute: "90'", team: "rm", type: "goal", player: "Espí", assist: "Mbappé" },
      { minute: "90+1'", team: "opp", type: "yellow", player: "Pere Milla" },
      { minute: "90+4'", team: "opp", type: "yellow", player: "Pol Lozano" },
    ],
  },

  "j3-malaga": {
    stadium: "Santiago Bernabéu",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.rudiger, R.trent], [R.valverde, R.camavinga], [R.vinicius, R.bellingham, R.brahim], [R.mbappe]]),
    opp: { name: "Málaga", formation: "—", kit: "#2B8FD6", kitText: "#FFFFFF", rows: [] },
    events: [
      { minute: "19'", team: "rm", type: "goal", player: "Bellingham" },
      { minute: "26'", team: "rm", type: "goal", player: "Herrero", note: "en propia puerta" },
      { minute: "30'", team: "rm", type: "goal", player: "Mbappé", assist: "Trent" },
      { minute: "87'", team: "rm", type: "sub", player: "Güler", out: "Bellingham" },
      { minute: "90+1'", team: "rm", type: "goal", player: "Güler", assist: "Vinícius" },
    ],
  },

  "j4-betis": {
    stadium: "Estadio de La Cartuja",
    referee: "Alejandro Hernández Hernández",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.konate, R.dumfries], [R.valverde, R.camavinga], [R.vinicius, R.bellingham, R.guler], [R.mbappe]]),
    opp: {
      name: "Real Betis", formation: "4-2-3-1", kit: "#0BA14A", kitText: "#FFFFFF",
      rows: [[o("Valles")], [o("Fran García"), o("Natan"), o("Llorente"), o("Bellerín")], [o("Roca"), o("Bernal")], [o("Fornals"), o("Isco"), o("Antony")], [o("Cucho Hernández")]],
    },
    events: [
      { minute: "38'", team: "opp", type: "sub", player: "Bartra", out: "Llorente" },
      { minute: "59'", team: "opp", type: "sub", player: "Fidalgo", out: "Isco" },
      { minute: "68'", team: "opp", type: "sub", player: "Deossa", out: "Bernal" },
      { minute: "68'", team: "opp", type: "sub", player: "Parrott", out: "Cucho Hernández" },
      { minute: "76'", team: "opp", type: "sub", player: "Riquelme", out: "Antony" },
      { minute: "81'", team: "opp", type: "goal", player: "Parrott" },
      { minute: "", team: "rm", type: "sub", player: "Espí", out: "Valverde" },
      { minute: "", team: "rm", type: "sub", player: "Carreras", out: "Cucurella" },
      { minute: "", team: "rm", type: "yellow", player: "Vinícius" },
    ],
  },

  "ucl1-inter": {
    stadium: "Santiago Bernabéu",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.konate, R.dumfries], [R.valverde, R.trent], [R.vinicius, R.bellingham, R.brahim], [R.mbappe]]),
    opp: {
      name: "Inter", formation: "3-5-2", kit: "#0F3FA6", kitText: "#FFFFFF",
      rows: [[o("J. Martínez", 1)], [o("Bastoni", 95), o("Bisseck", 31), o("Pavard", 28)], [o("Carlos Augusto", 30), o("Jones", 21), o("Çalhanoğlu", 20), o("Barella", 23), o("Diouf", 17)], [o("Lautaro", 10), o("Thuram", 9)]],
    },
    events: [
      { minute: "14'", team: "rm", type: "goal", player: "Mbappé" },
      { minute: "23'", team: "rm", type: "goal", player: "Valverde" },
      { minute: "", team: "rm", type: "yellow", player: "Huijsen" },
      { minute: "", team: "opp", type: "yellow", player: "Lautaro" },
      { minute: "77'", team: "opp", type: "goal", player: "Carlos Augusto", assist: "Lautaro" },
      { minute: "79'", team: "opp", type: "sub", player: "Mkhitaryan", out: "Carlos Augusto" },
      { minute: "87'", team: "rm", type: "sub", player: "Carreras", out: "Vinícius" },
      { minute: "", team: "rm", type: "sub", player: "Espí", out: "Mbappé" },
    ],
  },

  "j6-elche": {
    stadium: "Estadio Martínez Valero",
    referee: "Jesús Gil Manzano",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.konate, R.trent], [R.tchouameni, R.valverde], [R.vinicius, R.guler, R.diomande], [R.mbappe]]),
    opp: {
      name: "Elche", formation: "3-4-3", kit: "#0F8F4E", kitText: "#FFFFFF",
      rows: [[o("Dituro", 1)], [o("Chust", 23), o("Redondo", 5), o("Buba", 2)], [o("Neto", 16), o("Aguado", 8), o("Villar", 12), o("Revivo", 3)], [o("Morente", 20), o("Osorio", 24), o("Valera", 11)]],
    },
    events: [
      { minute: "25'", team: "rm", type: "goal", player: "Dituro", note: "en propia puerta" },
      { minute: "33'", team: "rm", type: "goal", player: "Mbappé" },
      { minute: "71'", team: "opp", type: "goal", player: "Osorio" },
      { minute: "83'", team: "rm", type: "sub", player: "Endrick", out: "Tchouaméni" },
      { minute: "83'", team: "opp", type: "goal", player: "Niño" },
      { minute: "86'", team: "rm", type: "sub", player: "Espí", out: "Trent" },
      { minute: "90+1'", team: "rm", type: "goal", player: "Espí", assist: "Mbappé" },
      { minute: "90+1'", team: "rm", type: "sub", player: "Dumfries", out: "Diomande" },
      { minute: "90+2'", team: "opp", type: "yellow", player: "Josan" },
      { minute: "90+3'", team: "opp", type: "yellow", player: "Villar" },
    ],
  },

  "j5-rayo": {
    stadium: "Santiago Bernabéu",
    rm: rm("4-2-3-1", [[R.courtois], [R.carreras, R.rudiger, R.konate, R.dumfries], [R.silva, R.valverde], [R.vinicius, R.bellingham, R.diomande], [R.mbappe]]),
    opp: {
      name: "Rayo Vallecano", formation: "4-2-3-1", kit: "#D9232D", kitText: "#FFFFFF",
      rows: [[o("Audero")], [o("Pedrosa"), o("Ciss"), o("Lejeune"), o("Ratiu")], [o("Bouaré"), o("López")], [o("García"), o("Díaz"), o("Tsitaishvili")], [o("Camello")]],
    },
    events: [
      { minute: "14'", team: "rm", type: "goal", player: "Mbappé", note: "penalti" },
      { minute: "17'", team: "rm", type: "goal", player: "Carreras", assist: "Mbappé" },
      { minute: "35'", team: "rm", type: "goal", player: "Bellingham", assist: "Vinícius" },
      { minute: "46'", team: "rm", type: "sub", player: "Camavinga", out: "Valverde" },
      { minute: "51'", team: "opp", type: "goal", player: "Camello" },
      { minute: "68'", team: "opp", type: "sub", player: "Belaid", out: "Bouaré" },
      { minute: "68'", team: "opp", type: "sub", player: "Valentín", out: "Díaz" },
      { minute: "69'", team: "rm", type: "sub", player: "Tchouaméni", out: "Silva" },
      { minute: "72'", team: "rm", type: "sub", player: "Güler", out: "Diomande" },
      { minute: "75'", team: "opp", type: "sub", player: "Sadick", out: "López" },
      { minute: "75'", team: "opp", type: "sub", player: "Alemao", out: "Camello" },
      { minute: "85'", team: "opp", type: "sub", player: "Balliu", out: "Pedrosa" },
      { minute: "89'", team: "rm", type: "sub", player: "Cucurella", out: "Vinícius" },
      { minute: "90+1'", team: "rm", type: "goal", player: "Mbappé", assist: "Güler" },
    ],
  },

  "j1-real-sociedad": {
    stadium: "Santiago Bernabéu",
    rm: rm("4-2-3-1", [[R.courtois], [R.carreras, R.huijsen, R.konate, R.dumfries], [R.valverde, R.silva], [R.vinicius, R.bellingham, R.guler], [R.mbappe]]),
    opp: { name: "Real Sociedad", formation: "—", kit: "#1F6FB5", kitText: "#FFFFFF", rows: [] },
    events: [
      { minute: "9'", team: "rm", type: "yellow", player: "Carreras" },
      { minute: "40'", team: "rm", type: "goal", player: "Mbappé", assist: "Valverde" },
      { minute: "44'", team: "opp", type: "goal", player: "Sucic" },
      { minute: "60'", team: "rm", type: "goal", player: "Mbappé", assist: "Bellingham" },
      { minute: "68'", team: "rm", type: "goal", player: "Vinícius", assist: "Bellingham" },
      { minute: "72'", team: "rm", type: "yellow", player: "Konaté" },
      { minute: "80'", team: "rm", type: "goal", player: "Mbappé", assist: "Vinícius" },
      { minute: "90+3'", team: "rm", type: "yellow", player: "Camavinga" },
    ],
  },

  "j11-racing": {
    stadium: "El Sardinero",
    referee: "Munuera Montero",
    rm: rm("4-2-3-1", [[R.courtois], [R.cucurella, R.huijsen, R.konate, R.trent], [R.tchouameni, R.silva], [R.diomande, R.bellingham, R.guler], [R.mbappe]]),
    opp: {
      name: "Racing de Santander", formation: "4-2-3-1", kit: "#0B8A3E", kitText: "#FFFFFF",
      rows: [[o("Agirrezabala")], [o("Aarón Martín"), o("Belocian"), o("Pablo Ramón"), o("Mantilla")], [o("Prati"), o("Iván Martín")], [o("Luque"), o("Vicente"), o("Canales")], [o("Zabiri")]],
    },
    events: [
      { minute: "11'", team: "rm", type: "goal", player: "Mbappé", note: "penalti" },
      { minute: "21'", team: "rm", type: "goal", player: "Bellingham" },
      { minute: "36'", team: "rm", type: "goal", player: "Diomande" },
    ],
  },
};
