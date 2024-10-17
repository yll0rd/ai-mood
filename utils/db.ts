import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
    // log: ['query']
})

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;