import { qa } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
	try {
		const user = await getUserByClerkId();
		if (!user) return new NextResponse("Not Authorized", { status: 403 });
		const { question } = await req.json();

		const entries = await db.journalEntry.findMany({
			where: {
				userId: user.id,
			},
			select: {
				id: true,
				content: true,
				createdAt: true,
			},
		});
		

		const answer = await qa(question, entries);
		return NextResponse.json({ data: answer });
	} 
    catch (err) {
        // @ts-expect-error: Ignoring this error because the following line may return a value of unknown type.
        const errorMessage = err.message; // This line may cause ts(18046)
 
        return NextResponse.json({ error: errorMessage });
         
     }
};
