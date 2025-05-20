import { PrismaClient } from "../generated/prisma/index.js";

declare global {
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ?? new PrismaClient({ log: ["query", "error", "warn"] });

export default prisma;
