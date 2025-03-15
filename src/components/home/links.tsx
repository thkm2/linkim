
import { getLinks } from "@/actions/crud-links"
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Link2OffIcon } from "lucide-react"

export default async function Links() {
	const links = await getLinks()

	if (links?.length < 1)
		return (
			<div className="w-full md:w-11/12 mx-auto p-5 flex justify-center items-center gap-2 group">
				<Link2OffIcon className="duration-300 hover:text-red-400 group-hover:text-red-400" />
				<h1 className="text-xl font-medium">il n'y a pas de lien ici...</h1>
			</div>
	)

	return ( <div className="w-full md:w-1/2 mx-auto p-5 grid grid-cols-1 gap-5 mt-28 mb-20">
		{links.map((link) => (
			<Card key={link.id}>
				<CardHeader>
					<CardTitle className="flex justify-between items-center">{link.name}<span className="text-sm py-1 px-2 border rounded-lg bg-primary/10 font-semibold">{link.clicked}</span></CardTitle>
					<CardDescription>{link.description != "" ? link.description : "Ce lien n'as pas de description"}</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link href={`/details/${link.slug}`}>
						<Button variant={"secondary"}>Voir plus</Button>
					</Link>
				</CardFooter>
		  </Card>
		))}
	</div>)
}