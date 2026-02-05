import type { CursorPaginationQuery } from '../schemas/pagination.schema';

export const CACHE_KEYS = {
   getDashboardMetricsKey: () => 'dashboard-metrics:all',
   getStoreInventoryKey: (query: CursorPaginationQuery) =>
      `inventory:by-store:limit=${query.limit}:cursor=${query.cursor ?? 'start'}`,
};

export const FEATURES = {
   SEED_ON_STARTUP: true,
};
