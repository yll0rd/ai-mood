// import { OpenAI } from
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
// import { ChatOpenAI } from "@langchain/openai";
import {
	ChatGoogleGenerativeAI,
	GoogleGenerativeAIEmbeddings,
} from "@langchain/google-genai";
import * as z from "zod";
import { JournalEntry } from "@prisma/client";
import { Document } from "langchain/document";
import { loadQARefineChain } from "langchain/chains";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const parser = StructuredOutputParser.fromZodSchema(
	z.object({
		mood: z
			.string()
			.describe("the mood of the person who wrote the journal entry."),
		subject: z.string().describe("the subject of the journal entry."),
		summary: z.string().describe("quick summary of the entry entry."),
		negative: z
			.boolean()
			.describe(
				"is the journal entry negative? (i.e. does it contain negative emotions?)."
			),
		color: z
			.string()
			.describe(
				"a hexidecimal color code that represents the mood of the entry. Example: #0101fe for blue representing happiness"
			),

		sentimentScore: z
			.number()
			.describe(
				"sentiment of the text and rated on a scale from -10 to 10, where -10 is extremely negative, 0 is neutral, and 10 is extremely positive."
			),
	})
);

const getPrompt = async (content: string) => {
	const formattedInstructions = parser.getFormatInstructions();

	const prompt = new PromptTemplate({
		template:
			"Analyze the following journal entry. Follow the instructions and format your response to match the format instructions, no matter what! \n{formattedInstructions}\n{entry}",
		inputVariables: ["entry"],
		partialVariables: { formattedInstructions },
	});

	const input = await prompt.format({
		entry: content,
	});

	return input;
};

export const analyze = async (_prompt: string) => {
	const prompt = await getPrompt(_prompt);
	// const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
	const model = new ChatGoogleGenerativeAI({
		temperature: 0,
		modelName: "gemini-1.5-flash",
	});
	const result = await model.invoke([{ role: "user", content: prompt }]);
	// console.log(result.content);

	try {
		return await parser.parse(result.content.toString());
	} catch (err) {
		// @ts-expect-error: Ignoring this error because the following line may return a value of unknown type.
		console.log(err.message); // This line may cause ts(18046)
	}
};

type JournalEntryType = Pick<JournalEntry, "id" | "content" | "createdAt">;
export const qa = async (question: string, entries: JournalEntryType[]) => {
	const docs = entries.map(
		(entry) =>
			new Document({
				pageContent: entry.content,
				metadata: { source: entry.id, date: entry.createdAt },
			})
	);
	const model = new ChatGoogleGenerativeAI({
		temperature: 0,
		modelName: "gemini-1.5-flash",
	});
	const chain = loadQARefineChain(model);
	const embeddings = new GoogleGenerativeAIEmbeddings();
	const store = await MemoryVectorStore.fromDocuments(docs, embeddings);
	const relevantDocs = await store.similaritySearch(question);
	const res = await chain.invoke({
		input_documents: relevantDocs,
		question,
	});

	return res.output_text;
};
