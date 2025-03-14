"use server"

import { drizzle } from 'drizzle-orm/neon-http'
import { linkSchema, LinkType } from '@/db/schema'
import { formSchema } from '@/components/home/add-link'
import z from "zod"
import slugify from 'slugify'
import { eq } from 'drizzle-orm'

const db = drizzle(process.env.DATABASE_URL!)

export const getLinks = async () => {
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

export const addLinkToDb = async (data: z.infer<typeof formSchema>) => {
	try {
		const response = await db.insert(linkSchema).values({
			name: data.name,
			slug: slugify(data.name),
			urlTo: data.urlTo,
			description: data.description
		})
	} catch (error) {
		console.log(error)
		throw error
	}
}

export const deleteLinkOfDb = async (id: number) => {
	try {
		await db.delete(linkSchema).where(eq(linkSchema.id, id))
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