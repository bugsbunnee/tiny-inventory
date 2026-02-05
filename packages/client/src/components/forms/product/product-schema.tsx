import z from 'zod';

export const productSchema = z.object({
   name: z.string().min(1, 'Product name is required'),
   price: z.number().positive('Price must be greater than 0'),
   description: z.string().min(4, 'Description must be at least 4 characters'),
   quantity_in_stock: z.number().positive(),
   image_url: z.string(),
   category_id: z.number().positive(),
   store_id: z.number().positive(),
});

export type ProductItem = z.infer<typeof productSchema>;
