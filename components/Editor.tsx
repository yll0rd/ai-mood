"use client";

import { updateEntry } from "@/utils/api";
import { JournalEntry } from "@prisma/client";
import { truncate } from "fs";
import React, { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }: { entry: JournalEntry }) => {
	const [value, setValue] = useState(entry.content);
	// const [saving, setSaving] = useState(false);
	const [isSaving, setIsSaving] = useState(false);

	useAutosave({
		data: value,
		onSave: async (_value) => {
			setIsSaving(true);
			await updateEntry(entry.id, _value);
			setIsSaving(false);
		},
	});

	return (
		<div className="w-full h-full relative">
			<div className="top-4 right-4 w-fit absolute text-neutral-400">{isSaving ? "Saving" : "Saved"}</div>
			<textarea
				className="h-full w-full p-8 text-xl outline-none"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		</div>
	);
};

export default Editor;
