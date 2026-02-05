import { prisma } from '../prisma';

import type { Product } from '../prisma/generated/prisma/client';
import type { ProductWhereInput } from '../prisma/generated/prisma/models';
import type { OffsetPaginatedResponse } from '../schemas/pagination.schema';
import type { IProduct, IProductQuery } from '../schemas/product.schema';

class ProductRepository {
   private static buildProductQuery(query: IProductQuery): ProductWhereInput {
      const queryInput: ProductWhereInput = {};

      if (query.search) {
         queryInput.name = { contains: query.search, mode: 'insensitive' };
      }

      if (query.min_price || query.max_price) {
         queryInput.price = {};

         if (query.min_price) {
            queryInput.price.gte = query.min_price;
         }

         if (query.max_price) {
            queryInput.price.lte = query.max_price;
         }
      }

      if (query.min_stock || query.max_stock) {
         queryInput.quantity_in_stock = {};

         if (query.min_stock) {
            queryInput.quantity_in_stock.gte = query.min_stock;
         }

         if (query.max_stock) {
            queryInput.quantity_in_stock.lte = query.max_stock;
         }
      }

      if (query.category_id) {
         queryInput.category_id = query.category_id;
      }

      if (query.store_id) {
         queryInput.store_id = query.store_id;
      }

      return queryInput;
   }

   static async createOneProduct(product: IProduct): Promise<Product> {
      return prisma.product.create({
         data: {
            name: product.name,
            price: product.price,
            description: product.description,
            image_url: product.image_url,
            quantity_in_stock: product.quantity_in_stock,
            category_id: product.category_id,
            store_id: product.store_id,
         },
      });
   }

   static async getAllProducts(query: IProductQuery): Promise<OffsetPaginatedResponse<Partial<Product>>> {
      const { page_number = 1, page_size = 10 } = query;

      const productQuery = this.buildProductQuery(query);
      const offset = (page_number - 1) * page_size;

      const [totalCount, products] = await Promise.all([
         prisma.product.count(),
         prisma.product.findMany({
            where: productQuery,
            skip: offset,
            take: page_size,
            include: {
               store: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
               category: {
                  select: {
                     id: true,
                     name: true,
                  },
               },
            },
            omit: {
               store_id: true,
               category_id: true,
            },
            orderBy: { created_at: 'desc' },
         }),
      ]);

      const totalPages = Math.ceil(totalCount / page_size);

      return {
         data: products,
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

   static async getOneProductyId(productId: number): Promise<Product | null> {
      return prisma.product.findUnique({
         where: {
            id: productId,
         },
      });
   }

   static async updateOneProduct(productId: number, product: IProduct): Promise<Product | null> {
      return prisma.product.update({
         where: { id: productId },
         data: {
            name: product.name,
            price: product.price,
            description: product.description,
            image_url: product.image_url,
            quantity_in_stock: product.quantity_in_stock,
            category_id: product.category_id,
            store_id: product.store_id,
         },
      });
   }

   static async deleteOneProductById(productId: number): Promise<Product | null> {
      return prisma.product.delete({ where: { id: productId } });
   }
}

export default ProductRepository;
