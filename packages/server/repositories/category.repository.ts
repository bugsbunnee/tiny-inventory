import { prisma } from '../prisma';

import type { ICategory } from '../schemas/category.schema';
import type { Category } from '../prisma/generated/prisma/client';
import type { OffsetPaginationQuery, OffsetPaginatedResponse } from '../schemas/pagination.schema';

class CategoryRepository {
   static async createOneCategory(category: ICategory): Promise<ICategory> {
      return prisma.category.create({
         data: {
            name: category.name,
         },
      });
   }

   static async getAllCategories({
      page_number: pageNumber = 1,
      page_size: pageSize = 10,
   }: OffsetPaginationQuery): Promise<OffsetPaginatedResponse<Category>> {
      const offset = (pageNumber - 1) * pageSize;

      const [totalCount, categories] = await Promise.all([
         prisma.category.count(),
         prisma.category.findMany({
            skip: offset,
            take: pageSize,
         }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);

      return {
         data: categories,
         pagination: {
            page_number: pageNumber,
            page_size: pageSize,
            total_count: totalCount,
            total_pages: totalPages,
            has_next_page: pageNumber < totalPages,
            has_previous_page: pageNumber > 1,
         },
      };
   }

   static async getOneCategoryById(categoryId: number): Promise<Category | null> {
      return prisma.category.findUnique({
         where: {
            id: categoryId,
         },
      });
   }

   static async updateOneCategory(categoryId: number, category: ICategory): Promise<Category | null> {
      return prisma.category.update({
         where: { id: categoryId },
         data: { name: category.name },
      });
   }

   static async deleteOneCategoryById(categoryId: number): Promise<Category | null> {
      return prisma.category.delete({ where: { id: categoryId } });
   }
}

export default CategoryRepository;
