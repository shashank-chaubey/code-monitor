"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

type ThemeToggleProps = {
  className?: string;
  /** Compact icon button for navbars */
  variant?: "icon" | "pill";
};

export function ThemeToggle({ className, variant = "icon" }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  function toggle() {
    setTheme(isDark ? "light" : "dark");
  }

  if (!mounted) {
    return (
      <span
        aria-hidden
        className={cn(
          variant === "pill"
            ? "inline-flex h-9 w-[4.5rem] rounded-full bg-muted"
            : "inline-flex size-9 rounded-full bg-muted",
          className,
        )}
      />
    );
  }

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-secondary px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted",
          className,
        )}
      >
        {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
        {isDark ? "Light" : "Dark"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-muted",
        className,
      )}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}