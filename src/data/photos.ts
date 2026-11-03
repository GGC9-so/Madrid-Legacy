// Fotos de jugadores. Usa SOLO imágenes de las que tengas licencia o permiso.
// 1) Automático: npm run fotos:buscar y npm run fotos:descargar (rellena photos.generated.json con Wikimedia Commons).
// 2) Manual: guarda el archivo en /public/players y añádelo aquí con su crédito. Ejemplo:
//    "kylian-mbappe": { src: "/players/kylian-mbappe.jpg", credit: "Foto: Autor, CC BY-SA 4.0, vía Wikimedia Commons" },
import generated from "./photos.generated.json";

type Photo = { src: string; credit: string };

export const PHOTOS: Record<string, Photo> = {
  ...(generated as Record<string, Photo>),
};
