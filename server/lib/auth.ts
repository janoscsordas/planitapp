import { betterAuth } from "better-auth";
import { lastLoginMethod, organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/db";
import { sendVerificationEmail } from "./send-email";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }
    },
    // cache session for 5 minutes in the cookies
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 5 * 60,
        },
    },
    rateLimit: {
        enabled: true,
    },
    plugins: [
        lastLoginMethod({
            maxAge: 60 * 60 * 24 * 30 // Storing for 30 days in the cookies
        }),
        organization()
    ],
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url }) => {
            void sendVerificationEmail({
                to: user.email,
                name: user.name,
                subject: "Regisztráció Megerősítése",
                url: url
            })
        },
    }
});