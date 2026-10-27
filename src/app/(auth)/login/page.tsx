import { Suspense } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connection } from "next/server";


async function LoginContent() {
    await connection();
    const session = await auth();
    if(session?.user) redirect("/dashboard");

    return (
        <AuthShell mode="login">
            <LoginForm />
        </AuthShell>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<AuthShell mode="login"><p className="text-sm text-muted-foreground" role="status">Checking your session…</p></AuthShell>}>
            <LoginContent />
        </Suspense>
    );
}
