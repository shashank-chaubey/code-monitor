import { ThemeToggle } from "@/components/theme-toggle";
import { Activity, Code2, GitBranch, ScanSearch, ShieldCheck } from "lucide-react";
import Link from "next/link";

type AuthShellProps = {
  children: React.ReactNode;
  mode: "login" | "register";
};

function AuthArtwork() {
  return (
    <div className="auth-art" aria-hidden="true">
      <div className="auth-art-grid" />
      <div className="auth-art-orbit">
        <span className="auth-art-ring auth-art-ring-outer" />
        <span className="auth-art-ring auth-art-ring-inner" />
        <span className="auth-art-core"><Activity /></span>
        <span className="auth-art-icon auth-art-code"><Code2 /></span>
        <span className="auth-art-icon auth-art-branch"><GitBranch /></span>
        <span className="auth-art-icon auth-art-scan"><ScanSearch /></span>
        <span className="auth-art-icon auth-art-shield"><ShieldCheck /></span>
      </div>
    </div>
  );
}

export function AuthShell({ children, mode }: AuthShellProps) {
  return (
    <main className="auth-shell flex min-h-svh items-center justify-center bg-background p-0 text-foreground sm:p-4">
      <div className="auth-frame relative grid min-h-svh w-full max-w-[1040px] overflow-hidden sm:min-h-[min(720px,calc(100svh-2rem))] sm:rounded-[1.6rem] sm:border sm:border-border lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="auth-panel absolute inset-0 z-0 overflow-hidden lg:relative lg:inset-auto lg:col-start-1" aria-label={`${mode} Code Monitor artwork`}>
          <div className="auth-panel-noise pointer-events-none absolute inset-0" />
          <AuthArtwork />
        </aside>

        <section className="auth-form-panel relative z-10 flex min-h-svh flex-col bg-transparent lg:min-h-0 lg:bg-card">
          <div className="absolute top-4 right-4 z-20 sm:top-5 sm:right-5">
            <ThemeToggle />
          </div>

          <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-8 lg:px-10 lg:py-8">
            <div className="auth-form-card w-full max-w-[390px]">
              <Link href="/" className="mb-5 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground transition hover:text-foreground">
                <Code2 className="size-4 text-primary" />
                CODE MONITOR
              </Link>
              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
