
import { getHistoryOf } from "@/actions/history";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"

import { LinkType } from "@/db/schema";

export default async function History({link}: {link: LinkType}) {
	const history = await getHistoryOf(link.id)
	const isHistory = !history || history.length < 1
	return (
		<div className="w-11/12 md:w-1/2 mx-auto rounded-xl border p-3 shadow-sm mb-20">
			<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Numéro d'utilisation</TableHead>
					<TableHead className="text-right">Date</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{isHistory
				? <TableRow><TableCell>Aucun historique pour l'instant...</TableCell>
					<TableCell className="text-right">-</TableCell></TableRow>
				: history.reverse().map((row) => (
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
		</div>
	)
}