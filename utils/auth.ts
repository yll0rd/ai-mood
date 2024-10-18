import { auth } from "@clerk/nextjs/server"
import { db } from "./db";

export const getUserByClerkId = async (opts={}) => {
    const { userId } = auth();
    
    if (!userId) return null;

    return await db.user.findFirst({
        where: {
            clerkId: userId,
        },
        ...opts
    })
}