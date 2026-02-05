import z from 'zod';

export const StoreSchema = z.object({
   name: z.string(),
   location: z.string(),
});

export const StoreAggregationSchema = StoreSchema.extend(
   z.object({
      id: z.number().positive(),
      total_products: z.number(),
      total_quantity: z.number(),
      total_inventory_value: z.number(),
   }).shape
);

export type IStoreAggregation = z.infer<typeof StoreAggregationSchema>;
export type IStore = z.infer<typeof StoreSchema>;
