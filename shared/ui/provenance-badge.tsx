import { formatUpdatedAt, getFreshness } from "@/shared/lib/format";
import { cn } from "@/shared/lib/utils";

type Props = {
  updatedAt: string;
  source: string;
  className?: string;
};

const freshnessLabel = {
  fresh: "Fresh",
  aging: "Aging",
  stale: "Stale",
} as const;

const freshnessClass = {
  fresh: "bg-accent-soft text-accent",
  aging: "bg-[#f3efe6] text-[#8a7350]",
  stale: "bg-[#f3e9ec] text-[#7a6570]",
} as const;

export function ProvenanceBadge({ updatedAt, source, className }: Props) {
  const freshness = getFreshness(updatedAt);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-xs text-muted",
        className,
      )}
    >
      <span
        className={cn(
          "rounded-full px-2.5 py-1 font-semibold tracking-wide uppercase",
          freshnessClass[freshness],
        )}
      >
        {freshnessLabel[freshness]}
      </span>
      <span>
        Updated {formatUpdatedAt(updatedAt)} · from {source}
      </span>
    </div>
  );
}
