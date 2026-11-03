import type { Position } from "./players";

export interface Slot { id: string; label: string; role: Position; x: number; y: number }
export interface Formation { id: string; name: string; slots: Slot[] }

const s = (id: string, label: string, role: Position, x: number, y: number): Slot => ({ id, label, role, x, y });

const gk = s("gk", "POR", "POR", 50, 91);
const back = [s("lb", "LI", "DEF", 14, 70), s("cb1", "DFC", "DEF", 37, 75), s("cb2", "DFC", "DEF", 63, 75), s("rb", "LD", "DEF", 86, 70)];

export const FORMATIONS: Formation[] = [
  {
    id: "433",
    name: "4-3-3",
    slots: [gk, ...back, s("cm1", "MC", "MED", 27, 53), s("cm2", "MC", "MED", 50, 57), s("cm3", "MC", "MED", 73, 53), s("lw", "EI", "DEL", 18, 24), s("st", "DC", "DEL", 50, 15), s("rw", "ED", "DEL", 82, 24)],
  },
  {
    id: "4231",
    name: "4-2-3-1",
    slots: [gk, ...back, s("dm1", "MCD", "MED", 37, 58), s("dm2", "MCD", "MED", 63, 58), s("lam", "EI", "DEL", 18, 34), s("am", "MCO", "MED", 50, 36), s("ram", "ED", "DEL", 82, 34), s("st", "DC", "DEL", 50, 14)],
  },
];
