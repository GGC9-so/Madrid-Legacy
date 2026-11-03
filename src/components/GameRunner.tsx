"use client";

import QuizGame from "./QuizGame";
import DorsalGame from "./DorsalGame";
import OrderXI from "./OrderXI";
import PenaltyGame from "./PenaltyGame";
import { buildGuessPlayer, buildGuessSigning, buildWhoSaid, buildLineups, buildTitles, buildYears, buildMoreLess, type Question } from "@/lib/gameBuilders";

const QUIZ: Record<string, { rules: string; build: () => Question[] }> = {
  "adivina-el-jugador": { rules: "Ocho jugadores de la plantilla actual. Empiezas con una pista y puedes pedir hasta dos más: con las tres pistas ganas 1 punto, con una sola ganas 3.", build: buildGuessPlayer },
  "adivina-el-fichaje": { rules: "Ocho fichajes históricos. Empiezas con una pista y puedes pedir más: cuantas menos uses, más puntos ganas (de 3 a 1).", build: buildGuessSigning },
  "quien-lo-dijo": { rules: "Frases en primera persona basadas en hechos reales de leyendas del club (no son citas textuales). Elige quién las diría.", build: buildWhoSaid },
  "alineacion-historica": { rules: "Te mostramos el once de una gran final con un hueco. Elige al jugador que falta.", build: buildLineups },
  "quiz-de-titulos": { rules: "Ocho preguntas sobre títulos, finales y fechas clave del club. Un punto por acierto.", build: buildTitles },
  "en-que-ano-paso": { rules: "Ocho momentos y fichajes del club. Elige el año en que ocurrieron. Un punto por acierto.", build: buildYears },
  "mas-o-menos": { rules: "Te damos una cifra (títulos o goles) y tú decides si la siguiente es mayor o menor. Diez preguntas, un punto por acierto.", build: buildMoreLess },
};

export default function GameRunner({ slug }: { slug: string }) {
  if (slug === "jugador-dorsal") return <DorsalGame />;
  if (slug === "ordena-el-11") return <OrderXI />;
  if (slug === "penaltis") return <PenaltyGame />;
  const quiz = QUIZ[slug];
  return quiz ? <QuizGame key={slug} id={slug} rules={quiz.rules} build={quiz.build} /> : null;
}
