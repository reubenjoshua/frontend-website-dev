import type { Place } from "@/features/place/types";

type Props = {
  place: Place;
};

export function TrendChart({ place }: Props) {
  const max = Math.max(...place.trend, 1);

  return (
    <section aria-labelledby="trend-heading" className="mt-10">
      <h2
        id="trend-heading"
        className="font-[family-name:var(--font-display)] text-2xl font-semibold text-foreground"
      >
        Air quality trend
      </h2>
      <p className="mt-2 text-sm text-muted">Recent weekly readings (mock data).</p>

      <ul
        className="mt-6 flex h-40 items-end gap-2"
        aria-label="Air quality trend values"
      >
        {place.trend.map((value, index) => (
          <li key={index} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs text-muted">{value}</span>
            <div
              className="w-full rounded-t-md bg-accent/80"
              style={{ height: `${(value / max) * 100}%` }}
              title={`Week ${index + 1}: ${value}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}