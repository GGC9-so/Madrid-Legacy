# Madrid Legacy

Web de aficionados del Real Madrid: plantilla, 11 ideal, fichajes históricos, VS, calendario, historia, leyendas, estadio, momentos y 10 minijuegos.
Next.js 15 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Lucide React.

## Ejecutar
1. `npm install`
2. `npm run dev` → http://localhost:3000
3. Para producción: `npm run build` (listo para Vercel; cambia `SITE.url` en `src/data/site.ts` por tu dominio)

## Páginas
`/` · `/squad` y `/squad/[slug]` · `/ideal-xi` · `/signings` y `/signings/[slug]` · `/torneo` · `/calendar` · `/stats` · `/comparador` · `/news` · `/history` · `/legends` · `/stadium` · `/moments` · `/games` y `/games/[slug]` · `/daily` (Reto del Día) · `/album` (cromos) · `/predict` · `/carnet` · `/copas`

## Minijuegos
Adivina el jugador · Adivina el fichaje · ¿Quién lo dijo? · Completa la alineación histórica · Quiz de títulos · ¿En qué año pasó? · Conecta jugador con dorsal · Más o menos · Ordena el 11 histórico · Penaltis

## Logo
Logo propio en `public/logo.png` (completo) y `public/logo-mark.png` (corona y escudo, usado en Navbar, Footer y 404). Favicon e imágenes para redes: `src/app/icon.png`, `apple-icon.png`, `opengraph-image.png` y `twitter-image.png`.

## Reto del Día
Cada día se generan 5 preguntas con una semilla basada en la fecha (`src/lib/daily.ts`), así que son las mismas para todos. La racha y los resultados se guardan en el navegador. Las preguntas salen de los mismos datos que los minijuegos (`gameBuilders.ts`).

## 11 ideal compartible
El botón "Descargar imagen" / "Compartir" de `/ideal-xi` dibuja la alineación en un canvas de 1080×1350 (`src/lib/lineupImage.ts`). "Compartir" usa el menú nativo del móvil cuando está disponible.

## Álbum de cromos
Cada leyenda de `legends.ts` es un cromo; la rareza se define en `src/data/cards.ts` (listas MITICAS y EPICAS). Probabilidades y composición del sobre: `src/lib/packs.ts`. Un sobre gratis al día, más otro si superas el 50 % del Reto del Día. La colección se guarda en el navegador.

## Predicciones y carné
`/predict`: el usuario predice los próximos 6 partidos (se cierra el día del partido). Los puntos se calculan solos cuando actualizas `matches.json` (exacto 5, resultado 2): `src/lib/predictions.ts`.
`/carnet`: junta cromos, racha, retos, predicciones, votos, 11 ideal y récords en un nivel (Cantera, Castilla, Primer equipo, Titular, Leyenda). Fórmula y niveles: `src/lib/profile.ts`.

## Las 15 Copas, app instalable y Noche de Champions
- `/copas`: recorrido con scroll por las 15 finales → `src/data/copas.ts`
- PWA: `src/app/manifest.ts`, iconos en `public/icon-*.png`, service worker en `public/sw.js` (solo se registra en producción) y página `/offline`. En Chrome/Android aparece el botón "Instalar la app" en el pie de página.
- Noche de Champions: los días con partido europeo en `matches.json` aparece un aviso arriba y la cabecera brilla en dorado (`src/components/ChampionsNight.tsx`).

## Resultados en directo (opcional)
Sin configurar nada, los partidos salen de `src/data/matches.json`. Para que se actualicen solos:
1. Regístrate gratis en https://www.football-data.org/client/register y copia tu token.
2. En local: copia `.env.example` a `.env.local` y pega la clave en `FOOTBALL_DATA_API_KEY`.
3. En Vercel: Project Settings > Environment Variables > añade `FOOTBALL_DATA_API_KEY` y vuelve a desplegar.
La web consulta la API como máximo 1 vez por minuto (límite gratuito: 10/min), actualiza calendario, resultados, balance de la temporada, predicciones y clasificación de LaLiga, y mientras haya un partido en juego refresca sola cada minuto. El plan gratuito tiene un pequeño retraso en los marcadores. Si la API falla, se usa el JSON. Las estadísticas individuales (goles y asistencias) y las noticias siguen siendo manuales. Código: `src/lib/live.ts`.

## Fotos de jugadores (opcional)
Las tarjetas y fichas funcionan sin fotos. Si consigues imágenes **con licencia o permiso**, guárdalas en `public/players/` y regístralas en `src/data/photos.ts` (slug, ruta y crédito): la tarjeta y la ficha las usan solas. No uses fotos descargadas de internet sin licencia: pertenecen a sus fotógrafos o agencias y los jugadores tienen derechos de imagen.

## Alineaciones y estadísticas por partido
Cada partido jugado enlaza a `/match/[id]`: campo con las dos alineaciones, camisetas con goles, tarjetas y cambios, cronología y, al tocar una camiseta, su ficha del partido con "Tu nota" y MVP (se guardan en el navegador). Los datos están en `src/data/lineups.ts`, con la clave igual al `id` del partido en `matches.json`. Si no se conoce el minuto de un suceso se deja `""`, y si no se conoce el once rival, `rows: []`. Mientras un partido no tenga datos cargados, la página muestra "próximamente".

## Torneo de Leyendas
`/torneo` sustituye al antiguo VS (`/vs` redirige aquí). Se sortean 8 o 16 leyendas, se enfrentan por eliminatoria y el usuario elige cada duelo. Al final se genera una tarjeta del campeón descargable o compartible (`src/lib/tournamentImage.ts`) y se guarda un ranking personal en el navegador. Lógica: `src/components/Tournament.tsx`.

## Comparador de jugadores
`/comparador`: radar de 6 ejes para dos jugadores de campo, con enlace compartible (`?a=slug&b=slug`). Las valoraciones son editoriales y se editan en `src/data/ratings.ts` (los porteros aún no tienen radar). Los goles y asistencias vienen de `stats.ts`.

### Buscar fotos con licencia libre automáticamente
Necesitas Node 18+ e internet (el script llama a Wikimedia Commons desde tu ordenador):
1. Abre `scripts/fotos.mjs` y pon tu correo en `USER_AGENT`.
2. `npm run fotos:buscar` crea `scripts/revision-fotos.html` con hasta 8 candidatas por jugador (solo CC0, dominio público, CC BY y CC BY-SA). Ábrelo en el navegador.
3. Revisa que sea la persona correcta y abre "Ver en Commons" para confirmar la licencia. Copia el título del archivo elegido en `scripts/fotos-elegidas.json`, por ejemplo `{ "kylian-mbappe": "File:Nombre del archivo.jpg" }`.
4. `npm run fotos:descargar` guarda las fotos en `public/players/` y crea los créditos. Reinicia `npm run dev`.
Los créditos aparecen en la ficha de cada jugador y en `/creditos`. Con CC BY-SA, si modificas la imagen (recortes, filtros) debes compartir esa versión con la misma licencia.

## Resúmenes en vídeo
En `src/data/videos.ts` asocia el id del partido (el de `matches.json`) con el enlace de YouTube del resumen oficial de LaLiga. La página `/match/[id]` muestra al final el resumen con dos botones: "Ver aquí" (reproductor dentro de la web, cargado solo al pulsar y en modo privacidad) y "Ver en YouTube". Si un vídeo no permite incrustarse, el botón de YouTube sigue funcionando.

### Resúmenes en vídeo automáticos (opcional)
Con `YOUTUBE_API_KEY` la web busca sola el resumen oficial de cada partido jugado: del canal de LaLiga para la Liga y del de UEFA para la Champions (se descartan los vídeos de otros canales o que no mencionen al rival). Los enlaces manuales de `videos.ts` siempre tienen prioridad.
1. En https://console.cloud.google.com crea un proyecto y activa "YouTube Data API v3".
2. Credenciales > Crear credenciales > Clave de API. Restringe la clave a esa API.
3. Ponla en `.env.local` (y en Vercel > Environment Variables) como `YOUTUBE_API_KEY`.
Cada búsqueda gasta 100 unidades de las 10.000 diarias gratuitas y se guarda 24 horas, así que hay margen de sobra.

## Qué editar
- Plantilla, dorsales y reseñas: `src/data/players.ts`
- Resultados del calendario: `src/data/matches.json` (`"status": "finished"` y `"score": [Madrid, rival]`)
- Preguntas, frases y alineaciones de los juegos: `src/lib/gameBuilders.ts` (y `OrderXI.tsx` para las alineaciones de "Ordena el 11")
- Títulos y portada: `src/data/site.ts`
- Fichajes y puntuaciones: `src/data/signings.ts` · Torneo de Leyendas: usa las leyendas de `legends.ts` y su rareza de `cards.ts`
- Historia, leyendas, momentos y estadio: `src/data/history.ts`, `legends.ts`, `moments.ts`, `stadium.ts`
- Estadísticas individuales (goles y asistencias): `src/data/stats.ts` (actualiza también la fecha). Las de equipo se calculan solas desde `matches.json`.
- Noticias: `src/data/news.ts` (añade un objeto con fecha, etiqueta, título y resumen)
- Clasificación de LaLiga en la portada: `LEAGUE` en `src/data/stats.ts`
- Leyendas: `src/data/legends.ts`
- Colores: `tailwind.config.ts`

Proyecto de aficionado, sin afiliación con el Real Madrid C.F.
