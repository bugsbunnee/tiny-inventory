import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

const adapter = new PrismaPg({ connectionString: Bun.env.DB_URL });
const prisma = new PrismaClient({ adapter });

export { prisma };
