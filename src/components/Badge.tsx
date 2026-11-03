import type { ReactNode } from "react";

const tones = {
  gold: "border-gold/50 bg-gold/10 text-gold-dark",
  night: "border-night/20 bg-night text-white",
  win: "border-win/30 bg-win/10 text-win",
  loss: "border-loss/30 bg-loss/10 text-loss",
};

export default function Badge({ children, tone = "gold" }: { children: ReactNode; tone?: keyof typeof tones }) {
  return <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
