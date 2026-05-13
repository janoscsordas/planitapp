import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "#/components/ui/avatar"
import { Button } from "#/components/ui/button";
import { IconUser, IconCreditCard, IconSettings, IconLogout } from "@tabler/icons-react";
import { Link, useRouter } from "@tanstack/react-router";

import { authClient } from "#/lib/auth-client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogMedia, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

export default function UserAvatar({ user }: { user: typeof authClient.$Infer.Session.user }) {
    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    
    const handleLogout = () => {
        startTransition(async () => {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        // We invalidate the router to force it to drop the cached auth context
                        router.invalidate();

                        setIsOpen(false);

                        toast.success("Sikeresen kijelentkeztél!");
                        
                        // We navigate to the login page
                        window.location.href = "/login";
                    },
                },
            });
        });
    }


  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu>
            <DropdownMenuTrigger render={
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>{user.name?.charAt(0) || "FH"}</AvatarFallback>
                    </Avatar>
                </Button>
            }>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center gap-2 pb-1">
                    <Avatar>
                        <AvatarImage src={user.image || ""} />
                        <AvatarFallback>{user.name?.charAt(0) || "FH"}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="font-medium text-sm">{user.name}</span>
                        <small className="text-muted-foreground text-xs">{user.email}</small>
                    </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link to="/profile">
                        <DropdownMenuItem className="cursor-pointer">
                            <IconUser />
                            Profil
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem disabled aria-disabled="true">
                        <IconCreditCard />
                        Előfizetés
                    </DropdownMenuItem>
                    <Link to="/settings">
                        <DropdownMenuItem className="cursor-pointer">
                            <IconSettings />
                            Beállítások
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger render={ 
                        <DropdownMenuItem variant="destructive" onClick={() => setIsOpen(true)}>
                            <IconLogout />
                            Kijelentkezés
                        </DropdownMenuItem>
                    }/>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent size="sm">
            <AlertDialogHeader>
                <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <IconLogout />
                </AlertDialogMedia>
                <AlertDialogTitle>Biztosan kijelentkezel?</AlertDialogTitle>
                <AlertDialogDescription>
                    Ha kijelentkezel, legközelebb újra be kell jelentkezned.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel variant="outline" disabled={isPending} onClick={() => setIsOpen(false)}>Mégse</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={handleLogout} disabled={isPending}>
                    {isPending ? <Spinner /> : "Kijelentkezés"}
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}