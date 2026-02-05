import type { Request, Response } from 'express';

import { HttpStatusCode } from 'axios';
import { ProductQuerySchema, type IProduct } from '../schemas/product.schema';

import CategoryRepository from '../repositories/category.repository';
import ProductRepository from '../repositories/product.repository';
import StoreRepository from '../repositories/store.repository';

class ProductController {
   static async getOneProduct(req: Request, res: Response) {
      const productId = Number(req.params.id);
      const product = await ProductRepository.getOneProductyId(productId);

      if (!product) {
         return res.status(HttpStatusCode.NotFound).json({ message: 'The product with the given ID does not exist.' });
      }

      res.json({
         success: true,
         message: 'Retrieved product successfully!',
         data: product,
      });
   }

   static async getProducts(req: Request, res: Response) {
      const productQuery = ProductQuerySchema.parse(req.query);
      const response = await ProductRepository.getAllProducts(productQuery);

      res.json({
         success: true,
         message: 'Retrieved products successfully!',
         data: response,
      });
   }

   static async createProduct(req: Request, res: Response) {
      const [store, category] = await Promise.all([
         StoreRepository.getOneStoreById(req.body.store_id),
         CategoryRepository.getOneCategoryById(req.body.category_id),
      ]);

      if (!store) {
         return res.status(HttpStatusCode.BadRequest).json({ message: 'Invalid store ID provided.' });
      }

      if (!category) {
         return res.status(HttpStatusCode.BadRequest).json({ message: 'Invalid category ID provided.' });
      }

      const product = await ProductRepository.createOneProduct(<IProduct>req.body);

      res.status(HttpStatusCode.Created).json({
         success: true,
         message: 'Product created successfully!',
         data: product,
      });
   }

   static async updateProduct(req: Request, res: Response) {
      const [store, category] = await Promise.all([
         StoreRepository.getOneStoreById(req.body.store_id),
         CategoryRepository.getOneCategoryById(req.body.category_id),
      ]);

      if (!store) {
         return res.status(HttpStatusCode.BadRequest).json({ message: 'Invalid store ID provided.' });
      }

      if (!category) {
         return res.status(HttpStatusCode.BadRequest).json({ message: 'Invalid category ID provided.' });
      }

      const productId = Number(req.params.id);
      const product = await ProductRepository.updateOneProduct(productId, req.body);

      if (!product) {
         return res.status(HttpStatusCode.NotFound).json({ message: 'The product with the given ID does not exist.' });
      }

      res.json({
         success: true,
         message: 'Product updated successfully!',
         data: product,
      });
   }

   static async deleteProduct(req: Request, res: Response) {
      const productId = Number(req.params.id);
      const product = await ProductRepository.deleteOneProductById(productId);

      if (!product) {
         return res.status(HttpStatusCode.NotFound).json({ message: 'The product with the given ID does not exist.' });
      }

      res.status(HttpStatusCode.Ok).json({
         success: true,
         message: 'Product deleted successfully!',
      });
   }
}

export default ProductController;
