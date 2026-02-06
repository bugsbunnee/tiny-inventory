import { mock, vi } from 'bun:test';
import 'dotenv/config';

Bun.env.NODE_ENV = 'test';

mock.module('../prisma', () => ({
   prisma: {
      store: {
         create: vi.fn(),
         findMany: vi.fn(),
         findUnique: vi.fn(),
         update: vi.fn(),
         delete: vi.fn(),
         count: vi.fn(),
      },
      $queryRaw: vi.fn(),
   },
}));
