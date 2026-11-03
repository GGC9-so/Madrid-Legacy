import Link from "next/link";
import NewsItem from "@/components/NewsItem";
import SectionHeading from "@/components/SectionHeading";
import { POSTS } from "@/data/news";

export default function LatestNews() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-x max-w-4xl">
        <SectionHeading title="Últimas noticias" />
        <ul className="mt-8 divide-y divide-gold/30 border-y border-gold/30">
          {POSTS.slice(0, 3).map((p) => <li key={p.id}><NewsItem post={p} /></li>)}
        </ul>
        <Link href="/news" className="btn-night mt-8">Ver todas las noticias</Link>
      </div>
    </section>
  );
}
