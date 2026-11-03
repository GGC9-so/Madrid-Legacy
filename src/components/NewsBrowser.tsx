"use client";

import { useState } from "react";
import FilterPill from "./FilterPill";
import NewsItem from "./NewsItem";
import { POSTS, TAGS, type NewsTag } from "@/data/news";

export default function NewsBrowser() {
  const [tag, setTag] = useState<NewsTag | null>(null);
  const list = tag ? POSTS.filter((p) => p.tag === tag) : POSTS;

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar noticias">
        <FilterPill active={tag === null} onClick={() => setTag(null)}>Todas</FilterPill>
        {TAGS.map((t) => <FilterPill key={t} active={tag === t} onClick={() => setTag(t)}>{t}</FilterPill>)}
      </div>
      <ul className="mt-6 divide-y divide-gold/30 border-y border-gold/30">
        {list.map((p) => <li key={p.id}><NewsItem post={p} /></li>)}
      </ul>
    </>
  );
}
