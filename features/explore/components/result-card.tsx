import Link from "next/link";
import type { Place } from "@/features/explore/types";
import { formatScore } from "@/shared/lib/format";

type Props = {
  place: Place;
};

export function ResultCard({ place }: Props) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 transition hover:border-accent/40">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
            <Link
              href={`/place/${place.id}`}
              className="rounded-sm outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              {place.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm capitalize text-muted">{place.district}</p>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted">{place.summary}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <div>
          <dt className="text-muted">Air</dt>
          <dd className="font-semibold text-foreground">
            {formatScore(place.airQuality)}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Transit</dt>
          <dd className="font-semibold text-foreground">
            {formatScore(place.transitScore)}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Green</dt>
          <dd className="font-semibold text-foreground">
            {formatScore(place.greenSpace)}
          </dd>
        </div>
        <div>
          <dt className="text-muted">Quiet</dt>
          <dd className="font-semibold text-foreground">
            {formatScore(place.noise)}
          </dd>
        </div>
      </dl>
    </article>
  );
}