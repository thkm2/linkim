"use client"

import Links from "@/components/home/links";
import { LinkType } from "@/db/schema";
import { useState, useEffect } from "react";
import { getLinks } from "@/actions/crud-links";

export default function Home() {
	const [links, setLinks] = useState<LinkType[]>([])
	useEffect(() => {
	const getData = async () => {
		const data = await getLinks()
		setLinks(data)
	}
	getData()}, [])
	return (
		<div className="w-full min-h-screen flex flex-col justify-center items-center gap-20">	
			<Links links={links} />
		</div>
	);
}
