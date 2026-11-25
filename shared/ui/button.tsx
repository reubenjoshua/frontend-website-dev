import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils";

type Variant = "primary" | "secondary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const buttonVariants: Record<Variant, string> = {
  primary:
    "cursor-pointer bg-accent text-accent-foreground hover:bg-[#0c6558] focus-visible:outline-ring",
  secondary:
    "cursor-pointer border border-border bg-surface text-foreground hover:border-accent/40 hover:bg-accent-soft focus-visible:outline-ring",
};

export const buttonBaseClassName =
  "inline-flex h-12 min-h-11 items-center justify-center rounded-lg px-6 text-base font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: Props) {
  return (
    <button
      type={type}
      className={cn(buttonBaseClassName, buttonVariants[variant], className)}
      {...props}
    />
  );
}
