// Busca y descarga fotos con licencia LIBRE de Wikimedia Commons para los jugadores de src/data/players.ts.
//   npm run fotos:buscar      -> crea scripts/revision-fotos.html con candidatas (ábrelo en el navegador)
//   npm run fotos:descargar   -> descarga las que elijas en scripts/fotos-elegidas.json y genera los créditos
// Requiere Node 18+ e internet. Antes de usarlo, pon tu correo en USER_AGENT (Wikimedia lo pide).
import fs from "node:fs/promises";
import path from "node:path";

const USER_AGENT = "MadridLegacy/1.0 (proyecto de aficionados; contacto: TU_CORREO@ejemplo.com)";
const API = "https://commons.wikimedia.org/w/api.php";
const ROOT = process.cwd();
const FILES = {
  players: path.join(ROOT, "src/data/players.ts"),
  picks: path.join(ROOT, "scripts/fotos-elegidas.json"),
  review: path.join(ROOT, "scripts/revision-fotos.html"),
  generated: path.join(ROOT, "src/data/photos.generated.json"),
  outDir: path.join(ROOT, "public/players"),
};

const slugify = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const clean = (html) => html.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function players() {
  const src = await fs.readFile(FILES.players, "utf8");
  return [...src.matchAll(/mk\(\d+,\s*"([^"]+)"/g)].map((m) => ({ name: m[1], slug: slugify(m[1]) }));
}

async function api(params) {
  const url = `${API}?${new URLSearchParams({ action: "query", format: "json", formatversion: "2", ...params })}`;
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Wikimedia respondió HTTP ${res.status}`);
  return res.json();
}

const INFO = { prop: "imageinfo", iiprop: "url|size|mime|extmetadata", iiurlwidth: "700", iiextmetadatafilter: "LicenseShortName|Artist|DateTime" };

// Solo licencias libres que permiten reutilizar con crédito: CC0, dominio público, CC BY y CC BY-SA (sin NC ni ND).
const isFree = (license) => /^(CC0|Public domain|PD\b|CC BY(-SA)? \d)/i.test(license) && !/(NC|ND)/.test(license);

function toCandidate(page) {
  const info = page.imageinfo?.[0];
  if (!info || !/^image\/(jpeg|png)$/.test(info.mime) || info.width < 500) return null;
  const meta = info.extmetadata ?? {};
  const license = meta.LicenseShortName?.value ?? "";
  if (!isFree(license)) return null;
  return {
    title: page.title,
    thumb: info.thumburl ?? info.url,
    mime: info.mime,
    page: info.descriptionurl,
    license,
    author: clean(meta.Artist?.value ?? "Autor desconocido"),
    date: meta.DateTime?.value ?? "",
  };
}

async function candidates(name) {
  let pages = [];
  try {
    const d = await api({ generator: "categorymembers", gcmtitle: `Category:${name}`, gcmtype: "file", gcmlimit: "60", ...INFO });
    pages = d.query?.pages ?? [];
  } catch {}
  if (pages.length === 0) {
    const d = await api({ generator: "search", gsrsearch: `${name} Real Madrid`, gsrnamespace: "6", gsrlimit: "30", ...INFO });
    pages = d.query?.pages ?? [];
  }
  return pages.map(toCandidate).filter(Boolean).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
}

async function buscar() {
  const list = await players();
  const sections = [];
  for (const p of list) {
    process.stdout.write(`Buscando ${p.name}... `);
    try {
      const found = await candidates(p.name);
      console.log(`${found.length} candidatas`);
      const figures = found.map((c) => `<figure><img src="${esc(c.thumb)}" loading="lazy"><figcaption>${esc(c.license)}<br>${esc(c.author)}<br><a href="${esc(c.page)}" target="_blank">Ver en Commons</a><br><code>${esc(c.title)}</code></figcaption></figure>`).join("");
      sections.push(`<h2>${esc(p.name)} <small>(${p.slug})</small></h2><div class="g">${figures || "<p>Sin candidatas con licencia libre.</p>"}</div>`);
    } catch (e) {
      console.log(`error: ${e.message}`);
    }
    await sleep(300);
  }
  const html = `<!doctype html><meta charset="utf-8"><title>Revisión de fotos</title><style>body{font-family:system-ui;margin:2rem;max-width:1200px}h2{margin-top:2.5rem}.g{display:flex;gap:1rem;flex-wrap:wrap}figure{width:180px;margin:0;font-size:12px}img{width:180px;height:220px;object-fit:cover;background:#eee}code{word-break:break-all}</style><h1>Candidatas con licencia libre</h1><p>Mira cada foto (que sea la persona correcta), abre su página para confirmar la licencia y copia el título en <code>scripts/fotos-elegidas.json</code>, por ejemplo <code>{ "kylian-mbappe": "File:Nombre del archivo.jpg" }</code>.</p>${sections.join("")}`;
  await fs.writeFile(FILES.review, html);
  console.log(`\nListo. Abre ${FILES.review}`);
}

async function descargar() {
  const picks = JSON.parse(await fs.readFile(FILES.picks, "utf8"));
  const generated = {};
  await fs.mkdir(FILES.outDir, { recursive: true });
  for (const [slug, title] of Object.entries(picks)) {
    try {
      const d = await api({ titles: title, ...INFO, iiurlwidth: "900" });
      const c = toCandidate(d.query?.pages?.[0] ?? {});
      if (!c) { console.log(`${slug}: sin licencia libre válida o imagen demasiado pequeña, se omite`); continue; }
      const res = await fetch(c.thumb, { headers: { "User-Agent": USER_AGENT } });
      if (!res.ok) throw new Error(`descarga HTTP ${res.status}`);
      const ext = c.mime === "image/png" ? "png" : "jpg";
      await fs.writeFile(path.join(FILES.outDir, `${slug}.${ext}`), Buffer.from(await res.arrayBuffer()));
      generated[slug] = { src: `/players/${slug}.${ext}`, credit: `Foto: ${c.author}, ${c.license}, vía Wikimedia Commons` };
      console.log(`${slug}: ok`);
    } catch (e) {
      console.log(`${slug}: error (${e.message})`);
    }
    await sleep(300);
  }
  await fs.writeFile(FILES.generated, JSON.stringify(generated, null, 2));
  console.log(`\n${Object.keys(generated).length} fotos listas. Reinicia npm run dev para verlas.`);
}

const cmd = process.argv[2];
if (cmd === "lista") console.table(await players());
else if (cmd === "buscar") await buscar();
else if (cmd === "descargar") await descargar();
else console.log("Uso: npm run fotos:buscar | npm run fotos:descargar");
