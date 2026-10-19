import Link from "next/link";
import { Menu } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const WORKFLOW = [
  {
    step: "01",
    title: "Connect your repository",
    description:
      "Connect a GitHub repository or upload a ZIP archive to prepare your source code for analysis.",
  },
  {
    step: "02",
    title: "Build codebase context",
    description:
      "Parse and index your code so relevant files and implementation details can be retrieved when needed.",
  },
  {
    step: "03",
    title: "Review actionable findings",
    description:
      "Explore code health insights, ask questions with source references, and prioritize issues by severity.",
  },
];

const FEATURES = [
  {
    number: "01",
    title: "Code health reports",
    description:
      "Review architecture, security, performance, maintainability, and testing signals in one structured report.",
  },
  {
    number: "02",
    title: "Source-grounded Q&A",
    description:
      "Ask questions about your repository and receive answers linked to relevant files and code locations.",
  },
  {
    number: "03",
    title: "Prioritized findings",
    description:
      "Filter findings by severity and category to focus your review on the issues that matter most.",
  },
];

const NAV_LINKS = [
  { href: "#why", label: "Overview" },
  { href: "#workflow", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#demo", label: "Demo" },
];

const CODE_LINES = [
  { cls: "code-comment", text: "// AI codebase analysis" },
  { cls: "code-key", text: 'repository.connect("your-project")' },
  { cls: "", text: "" },
  { cls: "code-ok", text: "→ reading files.............. done" },
  { cls: "code-ok", text: "→ detecting framework........ Next.js" },
  { cls: "code-ok", text: "→ building code context...... ready" },
  { cls: "code-ok", text: "→ analyzing code health....... complete" },
  { cls: "", text: "" },
  { cls: "code-key", text: "health.score = 82" },
  { cls: "code-key", text: "issues.highPriority = 3" },
  { cls: "code-key", text: 'ask("Explain the auth flow")' },
];

function CodePlane() {
  const lines = [...CODE_LINES, ...CODE_LINES, ...CODE_LINES];

  return (
    <div className="landing-code-plane" aria-hidden="true">
      <div className="landing-code-fade" />
      <pre>
        {lines.map((line, index) => (
          <span key={`${line.text}-${index}`} className={line.cls || undefined}>
            {line.text}{"\n"}
          </span>
        ))}
      </pre>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="landing-shell min-h-screen overflow-hidden bg-background text-foreground">
      {/* Navigation */}
      <header className="landing-header">
        <div className="mx-auto flex w-full items-center justify-between px-4 py-3 sm:px-6">
          <Link href="#top" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm">
              CM
            </span>
            <span className="landing-brand text-sm sm:text-base">
              Code Monitor
            </span>
          </Link>

          <nav aria-label="Landing sections" className="hidden items-center gap-1 lg:flex lg:gap-2">
            {NAV_LINKS.map((link) => (
              <a key={link.href} className="landing-nav-link" href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle className="border-border bg-transparent hover:bg-muted" />
            <Link
              href="/login"
              className="hidden items-center rounded-full border border-border bg-background/70 px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:inline-flex"
            >
              Sign in
            </Link>
            <Link
              href="#demo"
              className="landing-btn-primary hidden items-center rounded-full px-4 py-2.5 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:inline-flex"
            >
              Explore demo
            </Link>
            <details className="landing-mobile-menu relative lg:hidden">
              <summary className="flex h-9 cursor-pointer list-none items-center gap-2 rounded-full border border-border bg-background/70 px-3 text-sm font-medium text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden">
                <Menu aria-hidden="true" className="size-4" />
                <span className="sr-only">Open navigation menu</span>
              </summary>
              <nav aria-label="Mobile navigation" className="absolute right-0 top-[calc(100%+0.75rem)] flex w-52 flex-col gap-1 rounded-2xl border border-border bg-card p-2 text-sm shadow-xl shadow-foreground/10">
                <Link className="landing-nav-link" href="/login">Sign in</Link>
                {NAV_LINKS.map((link) => (
                  <a key={link.href} className="landing-nav-link" href={link.href}>
                    {link.label}
                  </a>
                ))}
                <Link className="landing-btn-primary mt-1 rounded-xl px-3 py-2.5 text-center font-semibold lg:hidden" href="#demo">
                  Explore demo
                </Link>
              </nav>
            </details>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="landing-hero relative isolate">
        <div aria-hidden className="landing-hero-glow pointer-events-none absolute inset-0 -z-10" />

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="max-w-2xl py-6 sm:py-10">
            <div className="landing-reveal inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
              Launching soon
            </div>

            <h1 className="landing-reveal landing-reveal-delay-1 landing-title mt-6 text-5xl text-foreground sm:text-6xl lg:text-[4.75rem]">
              A clearer view of your codebase is coming.
              <span className="text-primary">Make better decisions.</span>
            </h1>
            <p className="landing-reveal landing-reveal-delay-3 mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Building an AI-powered code health platform to help teams
              understand their repositories, spot risks, and decide what to
              improve next.
            </p>

            <div className="landing-reveal landing-reveal-delay-4 mt-8 flex flex-wrap gap-3">
              <Link
                href="#demo"
                className="landing-btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold"
              >
                See the product preview <span aria-hidden>→</span>
              </Link>
              <a
                href="#workflow"
                className="landing-btn-secondary inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold"
              >
                How it works
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><span className="text-primary">✓</span>Repository-aware answers</span>
              <span className="flex items-center gap-2"><span className="text-primary">✓</span>Traceable source references</span>
            </div>
          </div>

          <div className="hidden lg:block">
            <CodePlane />
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section id="why" className="landing-band border-y border-border py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="landing-kicker">
              The challenge
            </p>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl">
              Complex codebases deserve more than guesswork.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Traditional static analysis identifies predefined patterns, but
            understanding a repository often requires broader context. Code
            Monitor helps developers explore implementation details,
            review potential risks, and investigate findings with references to
            the underlying code.
          </p>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="landing-kicker">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              From repository to actionable insight.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              A focused workflow to help you move from unfamiliar code to
              evidence-backed understanding.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {WORKFLOW.map((item) => (
              <article
                key={item.step}
                className="rounded-2xl border border-border bg-card p-6 transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-foreground/5 sm:p-8"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent text-sm font-semibold text-accent-foreground">
                  {item.step}
                </span>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="landing-band border-y border-border py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="landing-kicker">
              Capabilities
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
              Insights designed for practical code reviews.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Bring code health, repository exploration, and issue prioritization
              into one coherent workflow.
            </p>
          </div>

          <div className="mt-14 grid gap-0 border-t border-border md:grid-cols-3 md:divide-x md:divide-border">
            {FEATURES.map((feature) => (
              <article key={feature.number} className="py-8 md:px-7 md:py-10 md:first:pl-0 md:last:pr-0">
                <p className="font-mono text-sm text-primary">{feature.number}</p>
                <h3 className="mt-5 text-xl font-semibold tracking-tight">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="py-24 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="landing-demo overflow-hidden rounded-3xl px-6 py-12 text-white sm:px-10 lg:px-14 lg:py-16">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--landing-glow)">
                  Launching soon
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Ask better questions about your code.
                </h2>
                <p className="mt-5 max-w-lg leading-7 text-white/75">
                  Investigate implementation details with answers designed to
                  point you back to the relevant source files.
                </p>
                <Link
                  href="#demo"
                  className="landing-btn-primary mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
                >
                  Explore the preview <span aria-hidden>→</span>
                </Link>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <span className="text-sm font-medium">Repository assistant</span>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                    Example conversation
                  </span>
                </div>
                <div className="mt-5 rounded-xl bg-white/[0.06] p-4">
                    <p className="text-xs font-medium text-(--landing-glow)">DEVELOPER</p>
                  <p className="mt-2 text-sm leading-6 text-white/90">
                    Explain the authentication flow in this project.
                  </p>
                </div>
                <div className="mt-3 rounded-xl border border-white/10 p-4">
                  <p className="text-xs font-medium text-(--landing-glow)">CODE MONITOR</p>
                  <p className="mt-2 text-sm leading-7 text-white/75">
                    Start by reviewing the authentication module, then trace
                    how session creation and route protection are implemented.
                    Use the cited files and line ranges to verify each step.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-(--landing-glow)">
                      src/lib/auth.ts
                    </span>
                    <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-(--landing-glow)">
                      src/proxy.ts
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-white/45">
                  Illustrative conversation. Actual responses depend on the
                  connected repository and analysis results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta border-t border-border py-20 sm:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-(--landing-glow)">
              Launching soon
            </p>
            <h2 className="landing-title mt-4 text-3xl text-white sm:text-4xl">
              Turn code complexity into actionable insight.
            </h2>
            <p className="mt-4 leading-7 text-white/70">
              Preparing Code Monitor for launch. Explore the product
              preview and workflow while we get it ready.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Link
              href="#demo"
              className="landing-btn-primary inline-flex items-center justify-center rounded-xl px-5 py-3.5 text-sm font-semibold"
            >
              View the product
            </Link>
            <Link
              href="#workflow"
              className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-transparent px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="landing-brand text-foreground">
            Code Monitor
          </span>
          <span>AI-powered repository analysis · Next.js · RAG</span>
        </div>
      </footer>
    </main>
  );
}
