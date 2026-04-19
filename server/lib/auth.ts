import { betterAuth } from "better-auth";
import { lastLoginMethod, organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database/db";
import { sendVerificationEmail } from "./send-email";
import { APIError, createAuthMiddleware } from "better-auth/api";
import {
  isDisposableEmail,
  isDisposableEmailDomain,
} from 'disposable-email-domains-js';

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL as string,
    database: drizzleAdapter(db, {
        provider: "pg"
    }),
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path !== "/sign-up/email") {
                return;
            }

            if (isDisposableEmail(ctx.body.email) || isDisposableEmailDomain(ctx.body.email.split("@")[1])) {
                throw new APIError("BAD_REQUEST", {
                    message: "Eldobható e-mail címek nem engedélyezettek."
                });
            }
        })
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
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
    appName: "PlanitApp",
    trustedOrigins: ["http://localhost:5173"],
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
    },
});