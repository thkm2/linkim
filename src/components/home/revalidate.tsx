"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Revalidate() {
	const router = useRouter()
	useEffect(() => {
		const reva = async () => {
			await fetch("/api/revalidate", {method: "POST"})
		}
		reva()
		router.refresh()
	}, [])
	return null
}