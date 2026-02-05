import { prisma } from '../prisma';
import { Prisma, type Store } from '../prisma/generated/prisma/client';

import type {
   OffsetPaginationQuery,
   OffsetPaginatedResponse,
   CursorPaginatedResponse,
   CursorPaginationQuery,
} from '../schemas/pagination.schema';
import type { IStore, IStoreAggregation } from '../schemas/store.schema';

class StoreRepository {
   static async createOneStore(store: IStore): Promise<Store> {
      return prisma.store.create({
         data: {
            name: store.name,
            location: store.location,
         },
      });
   }

   static async getAllStores({
      page_number = 1,
      page_size = 10,
   }: OffsetPaginationQuery): Promise<OffsetPaginatedResponse<Store>> {
      const offset = (page_number - 1) * page_size;

      const [totalCount, stores] = await Promise.all([
         prisma.store.count(),
         prisma.store.findMany({
            skip: offset,
            take: page_size,
            orderBy: { created_at: 'desc' },
         }),
      ]);

      const totalPages = Math.ceil(totalCount / page_size);

      return {
         data: stores,
         pagination: {
            page_number: page_number,
            page_size: page_size,
            total_count: totalCount,
            total_pages: totalPages,
            has_next_page: page_number < totalPages,
            has_previous_page: page_number > 1,
         },
      };
   }

   static async getInventoryByStore({
      cursor,
      limit = 10,
   }: CursorPaginationQuery): Promise<CursorPaginatedResponse<IStoreAggregation>> {
      const stores = await prisma.$queryRaw<IStoreAggregation[]>`
                    SELECT
                        s.id,
                        s.name,
                        s.location,
                        COUNT(p.id) AS total_products,
                        COALESCE(SUM(p.quantity_in_stock), 0) AS total_quantity,
                        COALESCE(SUM(p.price * p.quantity_in_stock), 0) AS total_inventory_value
                    FROM stores s
                    LEFT JOIN products p ON p.store_id = s.id
                    WHERE ${cursor ? Prisma.sql`s.id > ${cursor}` : Prisma.sql`TRUE`}
                    GROUP BY s.id
                    ORDER BY s.id ASC
                    LIMIT ${limit + 1};
                `;

      const processedStores = stores.map((store) => ({
         id: store.id,
         name: store.name,
         location: store.location,
         total_products: Number(store.total_products),
         total_quantity: Number(store.total_quantity),
         total_inventory_value: Number(store.total_inventory_value),
      }));

      if (processedStores.length <= limit) {
         return {
            data: processedStores,
            next_cursor: null,
         };
      }

      const nextStore = processedStores.pop();

      return {
         data: processedStores,
         next_cursor: nextStore!.id,
      };
   }

   static async getOneStoreById(storeId: number): Promise<Store | null> {
      return prisma.store.findUnique({
         where: {
            id: storeId,
         },
      });
   }

   static async updateOneStore(storeId: number, store: IStore): Promise<Store | null> {
      return prisma.store.update({
         where: { id: storeId },
         data: {
            name: store.name,
            location: store.location,
         },
      });
   }

   static async deleteOneStoreById(storeId: number): Promise<Store | null> {
      return prisma.store.delete({ where: { id: storeId } });
   }
}

export default StoreRepository;
