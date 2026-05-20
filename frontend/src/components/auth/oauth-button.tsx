import { authClient } from "#/lib/auth-client"
import { useTransition } from "react"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

type Provider = {
    id: 'github' | 'google'
    name: string
    icon: React.ReactNode
}

export default function OAuthButton({ provider }: { provider: Provider }) {
    const [isPending, startTransition] = useTransition()

    const handleOAuthLogin = async () => {
        startTransition(async () => {
            await authClient.signIn.social({
                provider: provider.id,
                callbackURL: '/projects',
                errorCallbackURL: '/error?error=oauth_failed',
            }, {
                onError: (error) => {
                    console.error('OAuth login failed:', error)
                }
            });
        });
    }
    
    return (
        <Button variant="outline" onClick={handleOAuthLogin} disabled={isPending} className="w-full">
            {isPending ? 
                <Spinner /> 
                : 
                <>
                    {provider.icon}
                    {provider.name}
                </>
            }
        </Button>
    )
}