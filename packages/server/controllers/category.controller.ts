import type { Request, Response } from 'express';

import { HttpStatusCode } from 'axios';
import { PaginationQuerySchema } from '../schemas/pagination.schema';

import CategoryRepository from '../repositories/category.repository';

class CategoryController {
   static async getOneCategory(req: Request, res: Response) {
      const categoryId = Number(req.params.id);
      const category = await CategoryRepository.getOneCategoryById(categoryId);

      if (!category) {
         return res.status(HttpStatusCode.NotFound).json({ message: 'The category with the given ID does not exist.' });
      }

      res.json({
         success: true,
         message: 'Retrieved category successfully!',
         data: category,
      });
   }

   static async getCategories(req: Request, res: Response) {
      const paginationQuery = PaginationQuerySchema.parse(req.query);
      const response = await CategoryRepository.getAllCategories(paginationQuery);

      res.json({
         success: true,
         message: 'Retrieved categories successfully!',
         data: response,
      });
   }
}

export default CategoryController;
