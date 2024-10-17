import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {

    const  href = (auth().userId) ? "journal" : "/new-user"
    return (
        <div className="w-screeen h-screen bg-black flex justify-center items-center text-white">
            <div className="w-full max-w-[600px] mx-auto space-y-4">
                <h1 className="text-6xl">The best Journal app, period.</h1>
                <p className="text-2xl text-white/60">Thia is the best app for tracking your mood through out your life. All you have to do is to be honest</p>
                <div>
                    <Link href={href}>
                        <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">Get Started</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}
