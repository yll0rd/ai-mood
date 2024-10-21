import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { analyze } from "@/utils/ai";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const POST = async (request: Request) => {
	const user = await getUserByClerkId();

	if (!user) return new NextResponse("Not Authorized", { status: 403 });

	const { content } = await request.json();

	const entry = await db.journalEntry.create({
		data: {
			userId: user.id,
			content: "I had a sad day. My girfriend dumped me. It is what it is.",
		},
	});

	const analysis = await analyze(content);
    await db.analysis.create({
        data: {
			userId: user.id,
            entryId: entry.id,
			...analysis!,
        }
    })

    revalidatePath("/journal")

	return NextResponse.json({ data: entry }, { status: 201 });
};
