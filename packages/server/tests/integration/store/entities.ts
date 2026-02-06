import type { Mock } from 'bun:test';
import type { prisma } from '../../../prisma';

export type MockStoreCreate = Mock<typeof prisma.store.create>;
