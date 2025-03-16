
import Links from "@/components/home/links";
import { LinkType } from "@/db/schema";
//import { useState, useEffect } from "react";
import { getLinks } from "@/actions/crud-links";
import Revalidate from "@/components/home/revalidate";

export default async function Home() {
	// const [links, setLinks] = useState<LinkType[]>([])
	// useEffect(() => {
	// const getData = async () => {
	// 	const data = await getLinks()
	// 	setLinks(data)
	// }
	// getData()}, [])
	const links = await getLinks()
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center gap-20">	
			<Revalidate />
			<Links links={links} />
		</div>
	);
}
