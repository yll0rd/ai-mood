import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST = async (request: Request) => {
	const user = await getUserByClerkId();

	if (!user) return new NextResponse("Not Authorized", { status: 403 });

	const entry = await db.journalEntry.create({
		data: {
			userId: user.id,
			content: "Write about your day",
		},
	});

    revalidatePath("/journal")

	return NextResponse.json({ data: entry }, { status: 201 });
};
