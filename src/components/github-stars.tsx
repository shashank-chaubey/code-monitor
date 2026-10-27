"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

const REPOSITORY = "shashank-chaubey/code-monitor";

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let controller: AbortController | undefined;

    const refreshStars = () => {
      controller?.abort();
      controller = new AbortController();

      fetch("/api/github-stars", { signal: controller.signal, cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("Unable to load GitHub stars");
          return response.json();
        })
        .then((repository: { stargazers_count?: number }) => {
          if (typeof repository.stargazers_count === "number") {
            setStars(repository.stargazers_count);
          }
        })
        .catch(() => {
          // Keep the repository link usable if the count is temporarily unavailable.
        });
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") refreshStars();
    };

    refreshStars();
    const interval = window.setInterval(refreshWhenVisible, 60_000);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      controller?.abort();
    };
  }, []);

  return (
    <a
      href={`https://github.com/${REPOSITORY}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`View Code Monitor on GitHub${stars === null ? "" : `, ${stars} stars`}`}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-background/70 px-3 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.51-1.3-1.24-1.65-1.24-1.65-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.76 2.27 3.72 1.62.1-.72.39-1.21.7-1.49-2.47-.28-5.07-1.24-5.07-5.51 0-1.22.44-2.22 1.15-3-.12-.29-.5-1.42.11-2.96 0 0 .94-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.11-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.67.12 2.96.71.78 1.14 1.78 1.14 3 0 4.28-2.6 5.22-5.08 5.5.4.35.75 1.03.75 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
      </svg>
      <span className="hidden sm:inline">GitHub</span>
      <span className="flex items-center gap-1 text-muted-foreground" aria-live="polite">
        <Star
          aria-hidden="true"
          className="size-3.5 fill-amber-200 text-amber-400 drop-shadow-[0_0_5px_rgba(245,158,11,0.8)]"
        />
        {stars ?? "—"}
      </span>
    </a>
  );
}
