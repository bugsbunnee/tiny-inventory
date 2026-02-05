import { prisma } from '../prisma';

import type { CursorPaginatedResponse } from '../schemas/pagination.schema';
import type { IStoreAggregation } from '../schemas/store.schema';

import StoreRepository from './store.repository';

interface DashboardMetrics {
   totalStores: number;
   totalProducts: number;
   totalCategories: number;
   totalInventoryValue: number;
   totalInventory: number;
   storeInventory: CursorPaginatedResponse<IStoreAggregation>;
}

class DashboardRepository {
   static async getDashboardMetrics(): Promise<DashboardMetrics> {
      const [totalStores, totalProducts, totalCategories] = await Promise.all([
         prisma.store.count(),
         prisma.product.count(),
         prisma.category.count(),
      ]);

      const storeInventory = await StoreRepository.getInventoryByStore({ limit: totalStores });
      const totalInventory = storeInventory.data.reduce((a, b) => a + Number(b.total_quantity), 0);
      const totalInventoryValue = storeInventory.data.reduce((a, b) => a + Number(b.total_inventory_value), 0);

      return {
         totalStores,
         totalProducts,
         totalCategories,
         totalInventory,
         totalInventoryValue,
         storeInventory,
      };
   }
}

export type { DashboardMetrics };
export default DashboardRepository;
