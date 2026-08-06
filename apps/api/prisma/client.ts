import { PrismaPg } from '@prisma/adapter-pg';

export function createPrismaAdapter(): PrismaPg {
  return new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  });
}
