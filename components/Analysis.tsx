import { cn } from "@/utils";
import { Analysis as AnalysisType } from "@prisma/client";
import React from "react";

const Analysis = ({ analysis }: { analysis: AnalysisType | null }) => {
	const analysisData = !analysis
		? []
		: [
				{ name: "Summary", value: analysis.summary },
				{ name: "Subject", value: analysis.subject },
				{ name: "Mood", value: analysis.mood },
				{
					name: "Negative",
					value: analysis.negative ? "True" : "False",
				},
		  ];
	return (
		<div className="border-l border-black/10">
			<div
				className="px-6 py-10"
				style={{ backgroundColor: !analysis ? "grey" : analysis.color }}
			>
				<h2 className="text-2xl">Analysis</h2>
			</div>
			<div>
				<ul>
					{analysisData.map(({ name, value }, id) => (
						<li
							key={id}
							className={cn(
								"flex px-2 py-4 border-y border-black/10  justify-between",
								{
									"flex-wrap gap-y-2": id < 2,
									"items-center": id > 1,
								}
							)}
						>
							<span className="text-lg font-semibold">
								{name}
							</span>
							<span className={`${id > 2 && "text-start"}`}>
								{value}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Analysis;
