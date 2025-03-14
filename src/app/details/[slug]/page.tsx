
import { getLink } from "@/actions/crud-links";
import { notFound } from "next/navigation";
import DetailsCard from "@/components/details/details";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"

export default async function details({ params }: {params: {slug: string}}) {
	const resolvedParams = await params;
	const { slug } = resolvedParams;
	const link = await getLink(slug)
	if (!link) 
		return notFound()

	return (
		<>
			<Link href={"/"} className="absolute m-5 max-sm:hidden"><Button variant={"ghost"}><ArrowLeft/>Retour</Button></Link>
			<div className="w-full min-h-screen flex justify-center items-center p-5">
				<DetailsCard link={link} />
			</div>
		</>
	)
}