import { getHistoryOf } from "@/actions/history";
import { LinkType } from "@/db/schema";
import {
	Card,
	CardDescription,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

export default async function DbLink({link}: {link: LinkType}) {
	const data = await getHistoryOf(link.id)
	const isHistory = !data || data.length < 1
	return (
		<div className="w-full">
			<Card key={link.id}>
				<CardHeader>
					<CardTitle>{link.name}</CardTitle>
					<CardDescription>{link.description != "" ? link.description : "Ce lien n'as pas de description"}</CardDescription>
				</CardHeader>
				<CardContent className="flex flex-col gap-2">
					<p className="text-lg font-medium">Ce lien :</p>
					<p className="py-1.5 px-3 border rounded-lg bg-muted duration-150 hover:text-zinc-400">{`http://localhost:3000/${link.slug}`}</p>
					<p className="text-lg font-medium">Redirige vers :</p>
					<p className="py-1.5 px-3 border rounded-lg bg-muted duration-150 hover:text-zinc-400">{link.urlTo}</p>
					<p className="text-lg font-medium mt-5">Il y'a eu <span className="py-0.75 px-2 border rounded-lg bg-muted">{link.clicked}</span> {link.clicked! <= 1 ? "utilisation" : "utilisations"} de ce lien</p>
				</CardContent>
				<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Numéro d'utilisation</TableHead>
					<TableHead className="text-right">Date</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isHistory
				? <><TableCell>Aucun historique pour l'instant...</TableCell>
					<TableCell className="text-right">-</TableCell></>
				: data.reverse().map((row) => (
					<TableRow key={row.id}>
						<TableCell className="font-medium">{row.number}</TableCell>
						<TableCell className="text-right">{row.date.toLocaleString("fr-FR", {
																					day: "numeric",
																					month: "long",
																					year: "numeric",
																					hour: "2-digit",
																					minute: "2-digit"
						})}</TableCell>
					</TableRow>
				))}
			</TableBody>
			</Table>
		  	</Card>
			
		</div>
	)
}