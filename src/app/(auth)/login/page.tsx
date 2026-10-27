import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function LoginPage() {
    const session = await auth();
    if(session?.user) redirect("/dashboard");

    return (
        <AuthShell mode="login">
            <LoginForm />
        </AuthShell>
    );
}