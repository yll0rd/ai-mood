import EntryPageContent from "@/components/EntryPageContent";
import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import React from "react";

const getEntry = async (entryId: string) => {
	const user = await getUserByClerkId();
	return await db.journalEntry.findUniqueOrThrow({
		where: {
			userId_id: {
				userId: user!.id,
				id: entryId,
			},
		},
		include: {
			analysis: true,
		},
	});
};

const EntryPage = async ({ params }: { params: { id: string } }) => {
	const { id } = params;
	const entry = await getEntry(id)
	return (
		<EntryPageContent entryWithAnalysis={entry} />
	);
};

export default EntryPage;
