import type { SelectHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: Props) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-ring/25",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
