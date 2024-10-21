"use client";

import { askQuestion } from "@/utils/api";
import { FormEvent, useState } from "react";

const Question = () => {
	const [value, setValue] = useState("");
	const [response, setResponse] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleOnSumbit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsSubmitting(true);

		const answer = await askQuestion(value);
        console.log(answer );
        
		setResponse(answer);
		// setValue("");
		setIsSubmitting(false);
	};
	return (
		<div>
			<form onSubmit={handleOnSumbit}>
				<input
					type="text"
					className="border border-black/20 px-4 py-2 text-lg rounded-lg"
					placeholder="Ask a question"
					value={value}
					onChange={e => setValue(e.target.value)}
					disabled={isSubmitting}
				/>
				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-4"
				>
					Ask
				</button>
			</form>
			{isSubmitting && <div>...Submitting</div>}
			{!!response && <div>{response}</div>}
		</div>
	);
};

export default Question;
