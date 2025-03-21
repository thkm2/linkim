"use server"

import { drizzle } from 'drizzle-orm/neon-http'
import { linkSchema, linkHistorySchema } from '@/db/schema'
import { formSchema } from '@/components/home/add-link'
import z from "zod"
import slugify from 'slugify'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

const db = drizzle(process.env.DATABASE_URL!)

export const getLinks = async (userId: number) => {
	try {
		const response = await db.select().from(linkSchema).where(eq(linkSchema.userId, userId))
		return response
	} catch (error) {
		throw error
	}
}

export const getAllLinks = async () => {
	try {
		const response = await db.select().from(linkSchema)
		return response
	} catch (error) {
		throw error
	}
}

export const getLink = async (slug: string) => {
	const repsonse = await db.select().from(linkSchema).where(eq(linkSchema.slug, slug))
	return repsonse[0]
}

export const addLinkToDb = async (data: z.infer<typeof formSchema>, userId: number) => {
	try {
		const response = await db.insert(linkSchema).values({
			name: data.name,
			slug: slugify(data.name),
			urlTo: data.urlTo,
			description: data.description,
			userId: userId
		})
		revalidatePath("/")
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const deleteLinkOfDb = async (id: number) => {
	try {
		await db.delete(linkHistorySchema).where(eq(linkHistorySchema.linkId, id))
		await db.delete(linkSchema).where(eq(linkSchema.id, id))
		revalidatePath("/")
	} catch (error) {
		throw error
	}
}

export const upDateLink = async (id: number, newVal: number) => {
	try {
		await db.update(linkSchema).set({clicked: newVal}).where(eq(linkSchema.id, id))
	} catch (error) {
		throw error
	}
}