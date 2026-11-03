// Resúmenes en vídeo de los partidos. Clave = "id" del partido en matches.json.
export const VIDEOS: Record<string, string> = {
  "j10-barcelona": "-IkJEN4dF-s",
};

export function youtubeId(input: string): string | null {
  const m =
    input.match(/(?:youtu\.be\/|[?&]v=|embed\/|shorts\/)([\w-]{11})/) ??
    input.match(/^([\w-]{11})$/);

  return m ? m[1] : null;
}
