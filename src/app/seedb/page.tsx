import { getAllLinks } from "@/actions/crud-links"
import DbLink from "./link"

export default async function SeeDb() {
	const links = await getAllLinks()
	return (
		<div className="w-full flex flex-col justify-center items-center gap-10 py-20">
			{links.map((link) => (
				<div className="w-11/12 md:w-2/3" key={link.id}>
					<DbLink link={link} />
				</div>
			))}
		</div>
	)
}