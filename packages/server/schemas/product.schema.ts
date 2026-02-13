import z from 'zod';
import { PaginationQuerySchema } from './pagination.schema';

export const ProductSchema = z.object({
   name: z.string(),
   price: z.number().positive(),
   image_url: z.url().optional(),
   description: z.string().min(3, { error: 'Description must be at least 3 characters' }),
   quantity_in_stock: z.number().min(0, 'Quantity in stock cannot be less than 0'),
   category_id: z.number().positive(),
   store_id: z.number().positive(),
});

export const ProductFilterSchema = z.object({
   search: z.string().min(1).optional(),
   min_price: z.coerce.number().positive().optional(),
   max_price: z.coerce.number().positive().optional(),
   min_stock: z.coerce.number().positive().optional(),
   max_stock: z.coerce.number().positive().optional(),
   category_id: z.coerce.number().positive().optional(),
   store_id: z.coerce.number().positive().optional(),
});

export const ProductQuerySchema = PaginationQuerySchema.extend(ProductFilterSchema.shape);

export type IProduct = z.infer<typeof ProductSchema>;
export type IProductFilter = z.infer<typeof ProductFilterSchema>;
export type IProductQuery = z.infer<typeof ProductQuerySchema>;
