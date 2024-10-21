import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const db = globalForPrisma.prisma ?? new PrismaClient({
    // log: ['query']
})

// @ts-expect-error: prisma might not be present in globalThis
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;