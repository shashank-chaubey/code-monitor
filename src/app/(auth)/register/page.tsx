import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connection } from "next/server";

async function RegisterContent() {
  await connection();
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <AuthShell mode="register">
      <RegisterForm />
    </AuthShell>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthShell mode="register"><p className="text-sm text-muted-foreground" role="status">Checking your session…</p></AuthShell>}>
      <RegisterContent />
    </Suspense>
  );
}
