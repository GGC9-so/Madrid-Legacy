import Badge from "./Badge";
import type { NewsPost, NewsTag } from "@/data/news";

const TONE: Record<NewsTag, "night" | "gold" | "win"> = { Partidos: "night", Fichajes: "gold", Club: "win" };
const fmt = (d: string) => new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${d}T12:00:00Z`));

export default function NewsItem({ post }: { post: NewsPost }) {
  return (
    <article className="grid gap-3 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
      <div className="flex items-center gap-3 sm:flex-col sm:items-start">
        <time dateTime={post.date} className="text-sm text-muted">{fmt(post.date)}</time>
        <Badge tone={TONE[post.tag]}>{post.tag}</Badge>
      </div>
      <div>
        <h3 className="text-2xl leading-snug text-night">{post.title}</h3>
        <p className="mt-2 leading-relaxed text-night/75">{post.summary}</p>
      </div>
    </article>
  );
}
