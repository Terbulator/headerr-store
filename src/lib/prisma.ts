import { PrismaClient } from '../generated/client'

// This prevents Next.js from creating too many database connections during development hot-reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma