// Dibuja la tarjeta del campeón del Torneo de Leyendas (1080×1350, formato 4:5) para compartir.
import type { Card } from "@/data/cards";
import { SITE } from "@/data/site";
import { family, loadImage, roundRect } from "./lineupImage";

const W = 1080;
const H = 1350;
const GOLD = "#C4A35A";
const NIGHT = "#0B1F3A";
const NIGHT_LIGHT = "#12305A";

function wrap(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = word; } else line = test;
  }
  if (line) lines.push(line);
  return lines;
}

export async function renderChampion(champion: Card, finalist: Card | undefined, semis: Card[], size: number) {
  const display = family("--font-display", "Georgia, serif");
  const sans = family("--font-sans", "system-ui, sans-serif");
  await Promise.all([document.fonts.load(`600 40px ${display}`), document.fonts.load(`600 28px ${sans}`)]).catch(() => {});
  const logo = await loadImage("/logo-mark.png");

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, NIGHT_LIGHT);
  bg.addColorStop(1, NIGHT);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 560, 0, W / 2, 560, 700);
  glow.addColorStop(0, "rgba(196,163,90,0.3)");
  glow.addColorStop(1, "rgba(196,163,90,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  roundRect(ctx, 24, 24, W - 48, H - 48, 28);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = `600 62px ${display}`;
  ctx.fillText("Mi mejor madridista", W / 2, 132);
  ctx.fillText("de la historia", W / 2, 202);

  // Tarjeta dorada del campeón
  const cx = 170, cy = 262, cw = 740, ch = 640;
  const gold = ctx.createLinearGradient(cx, cy, cx + cw, cy + ch);
  gold.addColorStop(0, "#D9C17F");
  gold.addColorStop(0.5, GOLD);
  gold.addColorStop(1, "#8F7435");
  ctx.fillStyle = gold;
  roundRect(ctx, cx, cy, cw, ch, 36);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.7)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "rgba(11,31,58,0.75)";
  ctx.font = `600 26px ${sans}`;
  ctx.fillText("Campeón del torneo", W / 2, cy + 64);

  ctx.fillStyle = NIGHT;
  let years = 64;
  ctx.font = `600 ${years}px ${display}`;
  while (ctx.measureText(champion.years).width > cw - 80 && years > 28) { years -= 4; ctx.font = `600 ${years}px ${display}`; }
  ctx.fillText(champion.years, W / 2, cy + 160);

  let name = 100;
  ctx.font = `600 ${name}px ${display}`;
  while (ctx.measureText(champion.name).width > cw - 80 && name > 40) { name -= 4; ctx.font = `600 ${name}px ${display}`; }
  ctx.fillText(champion.name, W / 2, cy + 290);

  ctx.fillStyle = "rgba(11,31,58,0.8)";
  ctx.font = `600 30px ${sans}`;
  ctx.fillText(champion.role, W / 2, cy + 350);

  ctx.fillStyle = NIGHT;
  ctx.font = `italic 600 42px ${display}`;
  wrap(ctx, champion.headline, cw - 100).slice(0, 3).forEach((line, i) => ctx.fillText(line, W / 2, cy + 450 + i * 54));

  // Camino al título
  ctx.fillStyle = "#fff";
  ctx.font = `600 32px ${sans}`;
  if (finalist) ctx.fillText(`Final: ganó a ${finalist.name}`, W / 2, 970);
  if (semis.length) {
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.font = `600 28px ${sans}`;
    ctx.fillText(`Semifinales: ${semis.map((s) => s.name).join(" y ")}`, W / 2, 1022);
  }
  ctx.fillStyle = GOLD;
  ctx.font = `600 26px ${sans}`;
  ctx.fillText(`Elegido entre ${size} leyendas del Real Madrid`, W / 2, 1078);

  // Pie
  if (logo) ctx.drawImage(logo, 80, 1196, (logo.width / logo.height) * 100, 100);
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.font = `600 42px ${display}`;
  ctx.fillText(SITE.name, 156, 1244);
  ctx.fillStyle = GOLD;
  ctx.font = `600 24px ${sans}`;
  ctx.fillText(`Juega el Torneo de Leyendas en ${SITE.url.replace("https://", "")}`, 156, 1280);

  return canvas;
}
