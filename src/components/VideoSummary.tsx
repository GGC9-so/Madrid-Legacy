"use client";

import { useState } from "react";
import { ExternalLink, Play } from "lucide-react";

export default function VideoSummary({ id, title }: { id: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-gold/40 bg-night shadow-card">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Reproducir: ${title}`} className="group absolute inset-0 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-gold text-night shadow-gold transition group-hover:scale-110"><Play className="h-9 w-9 fill-night" aria-hidden /></span>
            </span>
          </button>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!playing && <button type="button" onClick={() => setPlaying(true)} className="btn-gold"><Play className="h-4 w-4" /> Ver aquí</button>}
        <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="btn-night"><ExternalLink className="h-4 w-4" /> Ver en YouTube</a>
        <p className="text-sm text-muted">Resumen del canal oficial de LaLiga en YouTube.</p>
      </div>
    </div>
  );
}
