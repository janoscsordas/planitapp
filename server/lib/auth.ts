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
        onExistingUserSignUp: async ({ user }, request) => {
            // TODO: Send email that someone tried to sign up with their email address
        },
        sendResetPassword: async ({ user, url, token }) => {
            // TODO: Send reset password email
        },
        onPasswordReset: async ({ user }, request) => {
            // TODO: Send password reset confirmation email
        },
        revokeSessionsOnPasswordReset: true,
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
                url: url
            })
        },
        autoSignInAfterVerification: true,
        expiresIn: 30 * 60, // 30 minutes expire time for the verification link
    }
});