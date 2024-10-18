import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    const { id: journalEntryId } = params
    console.log(journalEntryId);

    const { content } = await request.json();
    
	const user = await getUserByClerkId();

	if (!user) return new NextResponse("Not Authorized", { status: 403 });

	const updatedEntry = await db.journalEntry.update({
		where: {
			userId_id: {
                id: journalEntryId,
                userId: user!.id
            }
		},
        data: {
            content
        }
	});

    revalidatePath("/journal")

	return NextResponse.json({ data: updatedEntry });
};
