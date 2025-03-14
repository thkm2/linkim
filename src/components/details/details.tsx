"use client"

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteLinkOfDb } from "@/actions/crud-links";
import { LinkType } from "@/db/schema";
import { redirect } from "next/navigation";
import { ChevronsRightIcon } from "lucide-react"
import { toast } from "sonner";

export default function DetailsCard({link}: {link: LinkType}) {
	const handleClick = async (id: number) => {
		await deleteLinkOfDb(id)
		toast.error("Lien supprimé")
		redirect("/")
	}
	return (
			<Card className="w-11/12 md:w-1/2">
				<CardHeader>
					<CardTitle className="text-4xl">{link.name}</CardTitle>
					<CardDescription className="text-xl">{link.description != "" ? link.description : "Ce lien n'as pas de description"}</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<p className="text-lg font-medium">Ce lien :</p>
					<Link href={`http://localhost:3000/${link.slug}`} className="py-1.5 px-3 border rounded-lg bg-muted duration-150 hover:text-zinc-400">{`http://localhost:3000/${link.slug}`}</Link>
					<p className="text-lg font-medium">Redirige vers :</p>
					<Link href={link.urlTo} className="py-1.5 px-3 border rounded-lg bg-muted duration-150 hover:text-zinc-400">{link.urlTo}</Link>
					<p className="text-lg font-medium mt-5"><ChevronsRightIcon className="inline" /> Il y'a eu <span className="py-0.75 px-2 border rounded-lg bg-muted">{link.clicked}</span> {link.clicked! <= 1 ? "utilisation" : "utilisations"} de ce lien</p>
				</CardContent>
				<CardFooter className="mt-5">
					<Button variant={"destructive"} onClick={() => handleClick(link.id)}>Supprimer</Button>
				</CardFooter>
			</Card>
	)
}