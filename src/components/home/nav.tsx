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
import { LinkIcon, Plus, SunMoonIcon, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes"

export default function Nav() {
	const { setTheme } = useTheme()

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
			</Menubar>
		</div>
	);
}