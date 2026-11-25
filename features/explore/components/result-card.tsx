import Link from "next/link";
import type { Place } from "@/features/explore/types";
import { formatScore } from "@/shared/lib/format";
import { ProvenanceBadge } from "@/shared/ui/provenance-badge";

type Props = {
  place: Place;
};

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <dt className="text-xs font-medium tracking-wide text-muted uppercase">
          {label}
        </dt>
        <dd className="text-sm font-semibold tabular-nums text-foreground">
          {formatScore(value)}
        </dd>
      </div>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-border/80"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function ResultCard({ place }: Props) {
  return (
    <article className="group border-b border-border/80 py-6 transition duration-200 first:pt-1 last:border-b-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.14em] text-accent uppercase">
            {place.district}
          </p>
          <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-[1.7rem]">
            <Link
              href={`/place/${place.id}`}
              className="cursor-pointer rounded-sm outline-none transition duration-200 hover:text-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              {place.name}
            </Link>
          </h3>
        </div>

        <Link
          href={`/place/${place.id}`}
          className="cursor-pointer text-sm font-semibold text-accent transition duration-200 hover:text-[#0c6558] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          View signals
          <span aria-hidden="true"> →</span>
        </Link>
      </div>

      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        {place.summary}
      </p>

      <ProvenanceBadge
        className="mt-4"
        updatedAt={place.updatedAt}
        source={place.source}
      />

      <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4">
        <Metric label="Air" value={place.airQuality} />
        <Metric label="Transit" value={place.transitScore} />
        <Metric label="Green" value={place.greenSpace} />
        <Metric label="Quiet" value={place.noise} />
      </dl>
    </article>
  );
}
