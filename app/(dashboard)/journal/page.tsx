import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkId } from "@/utils/auth";
import { db } from "@/utils/db";
import Link from "next/link";
import React from "react";

const getEntries = async () => {
	const user = await getUserByClerkId();
	return await db.journalEntry.findMany({
		where: {
			userId: user!.id,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
};
const JournalPage = async () => {
	const entries = await getEntries();
	console.log("Entries: ", entries);

	return (
		<div className="p-10 bg-zinc-400/10 h-full">
			<h2 className="text-3xl mb-8">Entries</h2>
			<div className="grid grid-cols-3 gap-4">
				<NewEntryCard />
				{entries.map((entry, id) => (
					<Link href={`/journal/${entry.id}`} key={id}>
						<EntryCard entry={entry} />
					</Link>
				))}
			</div>
		</div>
	);
};

export default JournalPage;
