import { describe, beforeEach, mock, it, expect, jest, vi, type Mock } from 'bun:test';
import { HttpStatusCode } from 'axios';
import { prisma } from '../../prisma';
import { SYSTEM_DATE } from '../constants';

import type { Store } from '../../prisma/generated/prisma/client';

import request from 'supertest';
import _ from 'lodash';

import app from '../..';

beforeEach(() => {
   jest.clearAllMocks();
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
      };

      const createMock = prisma.store.create as unknown as Mock<typeof prisma.store.create>;
      createMock.mockResolvedValue(mockStore as unknown as Store);

      const payload = _.pick(mockStore, ['name', 'location']);
      const response = await request(app).post('/api/stores').send(payload);

      expect(response.status).toBe(HttpStatusCode.Created);
      expect(response.body.data).toMatchObject(mockStore);
      expect(prisma.store.create).toHaveBeenCalledWith({ data: payload });
   });
});
