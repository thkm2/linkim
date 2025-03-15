import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import { getLink } from "@/actions/crud-links";
import { doAction } from "@/actions/history";

export default async function redirectTo({ params }: {params: {slug: string}}) {
	const { slug } = await params;
	const link = await getLink(slug)
	if (link?.urlTo) {
		await doAction(link)
		redirect(link.urlTo)
	} else
		return notFound()
}