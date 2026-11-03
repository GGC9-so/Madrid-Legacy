import Link from "next/link";
import Badge from "./Badge";
import { positionLabel } from "@/data/players";
import type { Signing } from "@/data/signings";

export default function SigningCard({ signing, rank }: { signing: Signing; rank: number }) {
  return (
    <Link href={`/signings/${signing.slug}`} className="card card-hover grid grid-cols-[auto_1fr] gap-5 p-5 sm:p-6">
      <span className="font-display text-5xl leading-none tabular-nums text-gold sm:text-6xl">{rank}</span>
      <div>
        <div className="flex flex-wrap gap-2">
          <Badge>{positionLabel(signing.position)}</Badge>
          <Badge tone="night">{signing.year}</Badge>
        </div>
        <h3 className="mt-3 text-2xl text-night">{signing.name}</h3>
        <p className="text-sm text-muted">Llegó desde {signing.from}</p>
        <p className="mt-3 text-night/80">{signing.headline}</p>
      </div>
    </Link>
  );
}
