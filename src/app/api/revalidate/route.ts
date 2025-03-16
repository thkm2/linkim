import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server";

export const POST = async () => {
	revalidatePath("/")
	return NextResponse.json({ revalidated: true });
}