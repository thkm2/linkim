import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { upDateLink } from "@/actions/crud-links";
import { getLink } from "@/actions/crud-links";

export default async function redirectTo({ params: {slug} }: {params: {slug: string}}) {
	const link = await getLink(slug)
	if (link?.urlTo) {
		await upDateLink(link.id, link.clicked! + 1)
		redirect(link.urlTo)
	} else
		return notFound()
}