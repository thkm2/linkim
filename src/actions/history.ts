"use server"

import { drizzle } from "drizzle-orm/neon-http"
import { linkHistorySchema, linkSchema, LinkType } from "@/db/schema"
import { eq } from "drizzle-orm"
import { getLink, upDateLink } from "./crud-links"
import { revalidatePath } from "next/cache"

const db = drizzle(process.env.DATABASE_URL!)

export const addHistoryTo = async (id: number, clicked: number) => {
	try {
		await db.insert(linkHistorySchema).values({
			linkId: id,
			number: clicked
		})
	} catch (error) {
		throw error
	}
}

export const getHistoryOf = async (id: number) => {
	try {
		const response = await db.select().from(linkHistorySchema).where(eq(linkHistorySchema.linkId, id))
		return response
	} catch (error) {
		throw error
	}
}

export const doAction = async (link: LinkType) => {
	try {
		await upDateLink(link.id, link.clicked! + 1)
		await addHistoryTo(link.id, link.clicked! + 1)
		revalidatePath("/")
	} catch (error) {
		throw error
	}
}