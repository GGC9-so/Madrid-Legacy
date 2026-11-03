// Valoraciones EDITORIALES (0-99) según el estilo de juego de cada futbolista. No son datos oficiales: ajústalas a tu gusto.
// Orden: Ritmo, Remate, Pase, Regate, Defensa, Físico. Los porteros no tienen radar todavía.
export const AXES = ["Ritmo", "Remate", "Pase", "Regate", "Defensa", "Físico"];

export const RATINGS: Record<string, number[]> = {
  "kylian-mbappe": [97, 92, 80, 93, 36, 78],
  "vinicius-junior": [95, 85, 78, 94, 30, 70],
  "rodrygo": [88, 80, 78, 88, 35, 62],
  "endrick": [85, 82, 66, 80, 30, 78],
  "yan-diomande": [90, 77, 72, 88, 33, 68],
  "brahim-diaz": [82, 77, 82, 90, 30, 58],
  "carlos-espi": [78, 80, 62, 72, 34, 72],
  "jude-bellingham": [80, 84, 85, 87, 74, 84],
  "arda-guler": [74, 78, 88, 88, 45, 62],
  "federico-valverde": [87, 80, 84, 82, 78, 88],
  "aurelien-tchouameni": [74, 68, 82, 78, 85, 87],
  "eduardo-camavinga": [82, 62, 82, 85, 82, 80],
  "bernardo-silva": [77, 76, 88, 90, 62, 66],
  "thiago-pitarch": [70, 62, 76, 76, 52, 56],
  "antonio-rudiger": [82, 52, 62, 62, 86, 90],
  "eder-militao": [84, 40, 60, 62, 87, 85],
  "dean-huijsen": [78, 45, 72, 65, 83, 82],
  "ibrahima-konate": [82, 38, 60, 60, 85, 90],
  "trent-alexander-arnold": [76, 66, 91, 78, 72, 70],
  "alvaro-carreras": [83, 50, 72, 74, 76, 74],
  "marc-cucurella": [76, 48, 76, 78, 80, 74],
  "ferland-mendy": [88, 45, 62, 66, 83, 82],
  "denzel-dumfries": [90, 60, 70, 70, 76, 86],
  "raul-asencio": [76, 40, 62, 58, 80, 78],
};
