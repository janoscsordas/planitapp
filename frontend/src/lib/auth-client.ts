import { createAuthClient } from "better-auth/react"
import { lastLoginMethodClient, organizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        lastLoginMethodClient(),
        organizationClient()
    ]
})

export async function signInWithGitHub() {
    await authClient.signIn.social({
        provider: "github",
        callbackURL: "/projects",
        errorCallbackURL: "/error",
    })
}

// Returns the last used login method for the current user
// We display this info in the UI
export function getLastLoginMethodForUser() {
    return authClient.getLastUsedLoginMethod()
}