export function formatScore(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUpdatedAt(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Unknown update time";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function getFreshness(iso: string): "fresh" | "aging" | "stale" {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "stale";

  const ageMs = Date.now() - date.getTime();
  const dayMs = 24 * 60 * 60 * 1000;

  if (ageMs <= 7 * dayMs) return "fresh";
  if (ageMs <= 30 * dayMs) return "aging";
  return "stale";
}
