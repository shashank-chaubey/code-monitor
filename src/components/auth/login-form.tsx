"use client";

import { GitHubIcon, GoogleIcon } from "@/components/auth/oauth-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginWithEmail,
  loginWithGithub,
  loginWithGoogle,
  type AuthFormState,
} from "@/lib/actions/auth";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";

const initialState: AuthFormState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginWithEmail,
    initialState,
  );
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-5">
      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <form action={loginWithGoogle}>
          <Button
            type="submit"
            variant="outline"
            className="h-10 w-full gap-2 rounded-lg border-border bg-background text-sm text-foreground shadow-sm hover:bg-muted/70"
          >
            <GoogleIcon className="size-5" />
            Google
          </Button>
        </form>
        <form action={loginWithGithub}>
          <Button
            type="submit"
            variant="outline"
            className="h-10 w-full gap-2 rounded-lg border-border bg-background text-sm text-foreground shadow-sm hover:bg-muted/70"
          >
            <GitHubIcon className="size-5" />
            GitHub
          </Button>
        </form>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs text-muted-foreground">Or</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={formAction} className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="eg. johnfrans@gmail.com"
            required
            className="h-10 rounded-lg bg-secondary/40 px-3"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              required
              minLength={8}
              className="h-10 rounded-lg bg-secondary/40 px-3 pe-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            Must be at least 8 characters.
          </p>
        </div>

        {state.error ? (
          <p className="text-sm text-destructive">{state.error}</p>
        ) : null}

        <Button
          type="submit"
          disabled={pending}
          className="h-10 w-full rounded-lg bg-foreground text-background hover:bg-foreground/90"
        >
          {pending ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-medium text-foreground">
          Sign up
        </Link>
      </p>
    </div>
  );
}
