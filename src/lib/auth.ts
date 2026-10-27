import { authConfig } from "@/lib/auth.config";
import { prisma } from "@/lib/db";
import { encryptToken } from "@/lib/encryption";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";


const credentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        ...authConfig.providers,
        Credentials({
            name: "Email",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = credentialsSchema.safeParse(credentials);
                if (!parsed.success) return null;
                const user = await prisma.user.findUnique({
                    where: {
                        email : parsed.data.email
                    },
                });
                if(!user?.passwordHash) return null;
                const valid = await compare(parsed.data.password, user.passwordHash);
                if(!valid) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    events: {
        async signIn({ user, account }) {
            if(!user.id || !account) return;

            const data: {
                authprovider: string,
                githubAccessToken?: string,
                githubUsername?: string,
            } = {
                authprovider: account.provider,
            };

            if(account.provider == "github" && account.access_token) {
                data.githubAccessToken = encryptToken(account.access_token);
    

                try {
                    const res = await fetch("https://api.github.com/user", {
                        headers: {
                            Authorization: `Bearer ${account.access_token}`,
                            Accept: "application/vnd.github+json",
                        },
                    });
                    
                    if(res.ok) {
                        const profile = (await res.json()) as { login?: string };
                        if (profile.login) data.githubUsername = profile.login;
                    }
                } catch (error) {}
            }
            
            await prisma.user.update({
                where: { id: user.id },
                data,
            });
        },
    },
});