import { CARDS, type Card, type Rarity } from "@/data/cards";
import { pick } from "./random";

// Probabilidades por carta: 5 % mítica, 25 % épica, 70 % común
const roll = (): Rarity => {
  const r = Math.random();
  return r < 0.05 ? "mitico" : r < 0.3 ? "epico" : "comun";
};
const draw = (rarity: Rarity): Card => pick(CARDS.filter((c) => c.rarity === rarity), 1)[0];

/** Un sobre trae 3 cartas y siempre al menos una épica o mejor. */
export function drawPack(): Card[] {
  const cards = [draw(roll()), draw(roll()), draw(roll())];
  if (cards.every((c) => c.rarity === "comun")) cards[2] = draw(Math.random() < 0.15 ? "mitico" : "epico");
  return cards;
}
