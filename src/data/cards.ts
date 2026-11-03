// Cada leyenda de src/data/legends.ts es un cromo. Aquí se decide su rareza.
import { LEGENDS, type Legend } from "./legends";

export type Rarity = "comun" | "epico" | "mitico";
export const RARITY_LABEL: Record<Rarity, string> = { comun: "Común", epico: "Épica", mitico: "Mítica" };
export const RARITY_PLURAL: Record<Rarity, string> = { comun: "Comunes", epico: "Épicas", mitico: "Míticas" };

const MITICAS = ["alfredo-di-stefano", "cristiano-ronaldo", "zinedine-zidane", "raul-gonzalez", "iker-casillas", "santiago-bernabeu", "sergio-ramos"];
const EPICAS = ["francisco-gento", "ferenc-puskas", "emilio-butragueno", "fernando-hierro", "roberto-carlos", "luis-figo", "ronaldo-nazario", "karim-benzema", "luka-modric", "toni-kroos", "marcelo", "carlo-ancelotti", "dani-carvajal", "vinicius-junior", "thibaut-courtois"];

export interface Card extends Legend { rarity: Rarity }

export const CARDS: Card[] = LEGENDS.map((l) => ({
  ...l,
  rarity: MITICAS.includes(l.slug) ? "mitico" : EPICAS.includes(l.slug) ? "epico" : "comun",
}));
