import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/journal", label: "Journal" },
	{ href: "/history", label: "History" },
];

const DashboardLayout = ({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) => {
	return (
		<div className="h-screen w-screen relative">
			<aside className="absolute top-0 w-[200px] left-0 border-r h-full border-black/10">
				<div>Mood</div>
				<ul>
					{links.map(({ href, label }, id) => (
						<li key={id} className="px-2 py-6 text-xl">
							<Link href={href}>{label}</Link>
						</li>
					))}
				</ul>
			</aside>
			<div className="ml-[200px]">
				<header className="h-[60px] border-b border-black/10">
					<div className="h-full w-full px-6 flex items-center justify-end">
						<UserButton />
					</div>
				</header>
				<div className="h-[calc(100vh-60px)]">{children}</div>
			</div>
		</div>
	);
};

export default DashboardLayout;
