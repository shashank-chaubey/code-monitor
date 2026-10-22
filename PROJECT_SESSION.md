# Code Monitor project session

Updated: 2026-10-22

## Project

Code Monitor is an AI-powered code health platform. The landing page is being built ahead of launch and presents repository analysis, code health insights, and source-grounded Q&A.

## Current implementation notes

- The landing page uses the existing light/dark theme system. Preserve the theme toggle when changing its design.
- The root layout loads Figtree, JetBrains Mono, and Manrope. `suppressHydrationWarning` is set on `<html>` because `next-themes` changes root attributes in the browser.
- The landing page navbar includes a GitHub repository link and star count for `shashank-chaubey/code-monitor`.
- The star count refreshes in the browser every 60 seconds and when the page becomes visible. `/api/github-stars` fetches the public GitHub repository data through a cached helper using Next.js 16 `use cache` and `cacheLife("minutes")`.
- The GitHub star icon is styled gold with a soft glow.
- Next.js 16 has `cacheComponents: true`; avoid route segment config such as `revalidate` in route handlers. Use Cache Components APIs (`use cache`, `cacheLife`) instead.
- Authentication is being migrated to NextAuth v5 beta so the `authorized` callback can be used. Prisma is on v7 with a schema at `prisma/schema.prisma` and configuration in `prisma.config.ts`.

## Recent files touched

- `src/app/page.tsx` — landing page and navbar.
- `src/app/layout.tsx` — metadata, fonts, theme provider, analytics, hydration warning suppression.
- `src/components/github-stars.tsx` — GitHub link, star count polling, and gold star icon.
- `src/app/api/github-stars/route.ts` — cached GitHub star-count endpoint.
- `src/lib/auth.config.ts`, `src/auth.ts`, `src/proxy.ts`, and auth route — NextAuth v5 setup.

## Follow-up

Run the project build in the local environment to confirm the latest Next.js cache and authentication changes compile together. Star counts are near-real-time, with an expected delay of about one minute; GitHub does not provide a live star-count stream.
