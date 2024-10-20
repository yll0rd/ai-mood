"use client";

import { updateEntry } from "@/utils/api";
import { Analysis, JournalEntry } from "@prisma/client";
import React, { useState } from "react";
import { useAutosave } from "react-autosave";


type DetailedEntry = JournalEntry & { analysis: Analysis | null }
type EditorProps = { 
	entry: DetailedEntry,
	setEntry: (value: DetailedEntry) => void,
}
const Editor = ({ entry, setEntry }: EditorProps) => {
	const [value, setValue] = useState(entry.content);
	// const [saving, setSaving] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	useAutosave({
		data: value,
		onSave: async (_value) => {
			setIsSaving(true);
			const updatedEntry = await updateEntry(entry.id, _value);
			if (!!updatedEntry)
				setEntry(updatedEntry);
			setIsSaving(false);
		},
	});

	return (
		<div className="w-full h-full relative">
			<div className="top-4 right-4 w-fit absolute text-neutral-400">{isSaving ? "Saving" : "Saved"}</div>
			<textarea
				placeholder="I am listening. Don't worry. I won't tell anyone."
				className="h-full w-full p-8 text-xl outline-none"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default Editor;
