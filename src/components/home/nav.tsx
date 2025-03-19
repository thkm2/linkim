"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { LinkIcon, Plus, SunMoonIcon, Sun, Moon, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes"
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";

export function NavC() {
    const { setTheme } = useTheme()
    const { data: session } = useSession()

    return (
        <div className="absolute w-full h-auto py-5 flex flex-col justify-center items-center gap-20">	
            <Menubar>
                <Link href={"/"}>
                    <MenubarMenu>
                        <MenubarTrigger><LinkIcon className="size-4 mr-1" />Accueil</MenubarTrigger>
                    </MenubarMenu>
                </Link>
                <Link href={"/add"}>
                    <MenubarMenu>
                        <MenubarTrigger><Plus className="size-5 mr-1" />Ajouter</MenubarTrigger>
                    </MenubarMenu>
                </Link>
                <MenubarMenu>
                    <MenubarTrigger><SunMoonIcon className="size-5 mr-1" />Thème</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem onClick={() => setTheme("light")}>
                            Claire
                            <MenubarShortcut><Sun /></MenubarShortcut>
                        </MenubarItem>
                        <MenubarSeparator />
                        <MenubarItem onClick={() => setTheme("dark")}>
                            Sombre
                            <MenubarShortcut><Moon /></MenubarShortcut>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                    {!session ? (
                        <MenubarTrigger onClick={() => signIn("github")}><LogIn className="size-4 mr-1" />Se connecter</MenubarTrigger>
                    ) : (
                        <MenubarTrigger onClick={() => signOut()}><LogOut className="size-4 mr-1" />Se déconnecter</MenubarTrigger>
                    )}
                </MenubarMenu>
            </Menubar>
        </div>
    );
}

export default function Nav() {
	return (
		<SessionProvider>
			<NavC />
		</SessionProvider>
	);
}