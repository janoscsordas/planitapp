import { authClient } from "#/lib/auth-client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export default function LogOutButton() {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    
    const handleLogout = () => {
        startTransition(async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        // We invalidate the router to force it to drop the cached auth context
                        router.invalidate();

                        toast.success("Sikeresen kijelentkeztél!");
                        
                        // We navigate to the login page
                        window.location.href = "/login";
                    },
                },
            });
        });
    }

    return (
        <Button variant="destructive" onClick={() => handleLogout()} disabled={isPending}>
            {isPending ? <Spinner /> : "Kijelentkezés"}
        </Button>
    )
}