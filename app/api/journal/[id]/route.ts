import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PATCH = async (request: Request, { params }: { params: { id: string } }) => {
    try {
        const { id: journalEntryId } = params
    console.log(journalEntryId);

    const { content } = await request.json();
    
	const user = await getUserByClerkId();

	if (!user) return new NextResponse("Not Authorized", { status: 403 });

	const entry = await db.journalEntry.update({
		where: {
			userId_id: {
                id: journalEntryId,
                userId: user.id
            }
		},
        data: {
            content
        },
        include: {
            analysis: true
        }
	});

    const analysis = await analyze(entry.content)

    await db.analysis.upsert({
        where: {
            entryId: entry.id
        },
        create: {
            entryId: entry.id,
            userId: user.id,
            ...analysis!
        },
        update: {
            ...analysis
        },
    })

    const updatedEntry = await db.journalEntry.findUniqueOrThrow({
        where: { id: journalEntryId },
        include: {
            analysis: true
        }
    })

    revalidatePath(`/journal/${journalEntryId}`)

	return NextResponse.json({ data: updatedEntry });
    }
    catch (err) {
       // @ts-expect-error: Ignoring this error because the following line may return a value of unknown type.
       const errorMessage = err.message; // This line may cause ts(18046)

       console.log(errorMessage);
       return NextResponse.json({ error: errorMessage });
        
    }
};
