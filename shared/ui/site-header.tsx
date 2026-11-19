"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/shared/lib/utils";

const navItems = [
  { href: "/explore", label: "Explore" },
  { href: "/editor", label: "Editor" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className={cn(
            "font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            pathname === "/" ? "text-accent" : "text-foreground",
          )}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          City Pulse
        </Link>

        <nav aria-label="Primary" className="flex items-center gap-2">
          {navItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.href === "/explore" && pathname.startsWith("/place/"));

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  active
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted hover:bg-accent-soft hover:text-accent",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
