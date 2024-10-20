// import { OpenAI } from
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
// import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import * as z from "zod";

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
	console.log(result.content);

    try {
        return await parser.parse(result.content.toString())
    } catch (err) {
        // @ts-expect-error: Ignoring this error because the following line may return a value of unknown type.
        console.log(err.message); // This line may cause ts(18046)
    }
};
