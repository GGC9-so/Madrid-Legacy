// Dibuja el 11 ideal en un canvas vertical (1080×1350, formato 4:5) listo para compartir.
import { getPlayer } from "@/data/players";
import { SITE } from "@/data/site";
import type { Formation } from "@/data/formations";

const W = 1080;
const H = 1350;
const GOLD = "#C4A35A";
const NIGHT = "#0B1F3A";
const NIGHT_LIGHT = "#12305A";

export const family = (v: string, fallback: string) => getComputedStyle(document.documentElement).getPropertyValue(v).trim() || fallback;

export function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export const loadImage = (src: string) =>
  new Promise<HTMLImageElement | null>((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });

export async function renderLineup(formation: Formation, lineup: Record<string, string>) {
  const display = family("--font-display", "Georgia, serif");
  const sans = family("--font-sans", "system-ui, sans-serif");
  await Promise.all([document.fonts.load(`600 40px ${display}`), document.fonts.load(`600 28px ${sans}`)]).catch(() => {});
  const logo = await loadImage("/logo-mark.png");

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Fondo
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, NIGHT_LIGHT);
  bg.addColorStop(1, NIGHT);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W * 0.85, 120, 0, W * 0.85, 120, 700);
  glow.addColorStop(0, "rgba(196,163,90,0.22)");
  glow.addColorStop(1, "rgba(196,163,90,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  roundRect(ctx, 24, 24, W - 48, H - 48, 28);
  ctx.stroke();

  // Título
  ctx.textAlign = "center";
  ctx.fillStyle = "#fff";
  ctx.font = `600 84px ${display}`;
  ctx.fillText("Mi 11 ideal", W / 2, 138);
  ctx.fillStyle = GOLD;
  ctx.font = `600 30px ${sans}`;
  ctx.fillText(`Formación ${formation.name}`, W / 2, 190);

  // Campo
  const px = 80, py = 230, pw = 920, ph = 980;
  ctx.strokeStyle = "rgba(196,163,90,0.4)";
  ctx.lineWidth = 2;
  roundRect(ctx, px, py, pw, ph, 20);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(px, py + ph / 2);
  ctx.lineTo(px + pw, py + ph / 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(px + pw / 2, py + ph / 2, 100, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeRect(px + pw * 0.22, py, pw * 0.56, ph * 0.14);
  ctx.strokeRect(px + pw * 0.22, py + ph * 0.86, pw * 0.56, ph * 0.14);

  // Jugadores
  for (const slot of formation.slots) {
    const cx = px + (slot.x / 100) * pw;
    const cy = py + (slot.y / 100) * ph - 14;
    const player = getPlayer(lineup[slot.id] ?? "");
    ctx.beginPath();
    ctx.arc(cx, cy, 48, 0, Math.PI * 2);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    if (player) {
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = GOLD;
      ctx.stroke();
      ctx.fillStyle = NIGHT;
      ctx.font = `600 42px ${display}`;
      ctx.fillText(String(player.number), cx, cy + 2);
    } else {
      ctx.setLineDash([10, 8]);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(196,163,90,0.7)";
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = GOLD;
      ctx.font = `600 26px ${sans}`;
      ctx.fillText(slot.label, cx, cy);
    }
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#fff";
    ctx.font = `600 28px ${sans}`;
    ctx.fillText(player ? player.short : "", cx, cy + 92);
  }

  // Pie
  if (logo) ctx.drawImage(logo, 80, 1232, (logo.width / logo.height) * 86, 86);
  ctx.textAlign = "left";
  ctx.fillStyle = "#fff";
  ctx.font = `600 40px ${display}`;
  ctx.fillText(SITE.name, 150, 1275);
  ctx.fillStyle = GOLD;
  ctx.font = `600 24px ${sans}`;
  ctx.fillText(`Arma el tuyo en ${SITE.url.replace("https://", "")}`, 150, 1308);

  return canvas;
}
