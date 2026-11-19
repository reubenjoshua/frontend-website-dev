import type { Place } from "@/features/place/types";

type Props = {
  place: Place;
};

export function TrendChart({ place }: Props) {
  const max = Math.max(...place.trend, 1);
  const latest = place.trend[place.trend.length - 1];

  return (
    <section
      aria-labelledby="trend-heading"
      className="mt-12 rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <h2
        id="trend-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        Air quality trend
      </h2>
      <p className="mt-2 text-sm text-muted">Recent weekly readings (mock data).</p>

      <p className="sr-only">
        Air quality readings over {place.trend.length} weeks:{" "}
        {place.trend.join(", ")}. Latest value {latest}.
      </p>

      <ul className="mt-8 flex h-52 items-end gap-3" aria-hidden="true">
        {place.trend.map((value, index) => (
          <li
            key={index}
            className="flex h-full min-w-0 flex-1 flex-col items-center gap-2"
          >
            <span className="text-xs font-medium text-muted">{value}</span>
            <div className="flex w-full flex-1 items-end">
              <div
                className="w-full rounded-t-md bg-accent/85"
                style={{ height: `${(value / max) * 100}%` }}
                title={`Week ${index + 1}: ${value}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
