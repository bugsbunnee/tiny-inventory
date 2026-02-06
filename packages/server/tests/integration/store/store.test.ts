import { describe, beforeEach, mock, it, expect, jest, vi, type Mock } from 'bun:test';
import { HttpStatusCode } from 'axios';
import { prisma } from '../../../prisma';
import { SYSTEM_DATE } from '../../constants';

import type { Store } from '../../../prisma/generated/prisma/client';
import type { MockStoreCreate } from './entities';

import request from 'supertest';
import _ from 'lodash';

import app from '../../..';

mock.module('../../prisma', () => ({
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

beforeEach(() => {
   jest.useFakeTimers();
   jest.setSystemTime(SYSTEM_DATE);
});

describe('POST /api/stores', () => {
   it('should create a new store', async () => {
      const mockStore = {
         id: 1,
         name: 'Beauty Store',
         location: 'Lagos',
         created_at: SYSTEM_DATE.toISOString(),
         updated_at: SYSTEM_DATE.toISOString(),
      } as unknown as Store;

      (prisma.store.create as unknown as MockStoreCreate).mockResolvedValue(mockStore);

      const payload = _.pick(mockStore, ['name', 'location']);
      const response = await request(app).post('/api/stores').send(payload);

      expect(response.status).toBe(HttpStatusCode.Created);
      expect(response.body.data).toMatchObject(mockStore);
      expect(prisma.store.create).toHaveBeenCalledWith({ data: payload });
   });
});
