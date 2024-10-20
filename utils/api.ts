import { Analysis, JournalEntry } from "@prisma/client";

const createURL = (path: string) => window.location.origin + path;

export const updateEntry = async (
	id: string,
	content: string
): Promise<(JournalEntry & { analysis: Analysis }) | undefined> => {
	const path = createURL(`/api/journal/${id}`);
	const res = await fetch(
		new Request(path, {
			method: "PATCH",
			body: JSON.stringify({ content }),
		})
	);

	if (res.ok) return (await res.json()).data;
};

export const createNewEntry = async () => {
	const path = createURL("/api/journal");
	const res = await fetch(
		new Request(path, {
			method: "POST",
			body: JSON.stringify({}),
		})
	);

	if (res.ok) return (await res.json()).data;
};
