"use client";

import { Analysis as AnalysisType, JournalEntry } from "@prisma/client";
import Editor from "@/components/Editor";
import { useState } from "react";
import Analysis from "@/components/Analysis";

type EntryPageContentProps = {
    entryWithAnalysis: JournalEntry & { analysis: AnalysisType | null }
}
const EntryPageContent = ({ entryWithAnalysis: entry }: EntryPageContentProps) => {
    const [_entry, setEntry] = useState(entry);
	return (
		<div className="w-full h-full grid grid-cols-3">
			<div className="col-span-2">
				<Editor entry={_entry} setEntry={setEntry} />
			</div>
			<Analysis analysis={_entry.analysis} />
		</div>
	);
}

export default EntryPageContent