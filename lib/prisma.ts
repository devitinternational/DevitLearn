// lib/prisma.ts
import { PrismaClient } from "@devitinternational/db";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

function createClient(): PrismaClient {
  const isDev = process.env.IS_DEV === "true";
  const connectionString = isDev
    ? process.env.DEV_DATABASE_URL!
    : process.env.PROD_DATABASE_URL!;
  
  const adapter = new PrismaPg({ connectionString });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
