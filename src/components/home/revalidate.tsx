"use client"

import { useEffect } from "react"

export default function Revalidate() {
	useEffect(() => {
		const reva = async () => {
			await fetch("/api/revalidate", {method: "POST"})
		}
		reva()
	}, [])
	return null
}