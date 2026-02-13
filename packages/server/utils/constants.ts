import type { CursorPaginationQuery } from '../schemas/pagination.schema';

export const CACHE_KEYS = {
   getDashboardMetricsKey: () => 'dashboard-metrics:all',
   getStoreInventoryKey: (query: CursorPaginationQuery) =>
      `inventory:by-store:limit=${query.limit}:cursor=${query.cursor ?? 'start'}`,
};

export const FEATURES = {
   SEED_ON_STARTUP: true,
};

export const DEFAULT_IMAGE_URL =
   'https://images.unsplash.com/photo-1605496036006-fa36378ca4ab?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
