// Resúmenes en vídeo de los partidos. Clave = "id" del partido en matches.json.
// Valor = enlace de YouTube (o solo el identificador de 11 caracteres). Usa los vídeos oficiales del canal de LaLiga. Ejemplo:
//   "j11-racing": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
export const VIDEOS: Record<string, string> = {};

export function youtubeId(input: string): string | null {
  const m = input.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/) ?? input.match(/^([\w-]{11})$/);
  return m ? m[1] : null;
}
export const VIDEOS: Record<string, string> = {
  "j10-barcelona": "https://youtu.be/-IkJEN4dF-s?si=mhWsFDWVgQ0-kIKo",
};
