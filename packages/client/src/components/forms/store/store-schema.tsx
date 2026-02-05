import z from 'zod';

export const storeSchema = z.object({
   name: z.string().min(1, 'Store name is required'),
   location: z.string().min(4, 'Location must be at least 4 characters'),
});

export type StoreItem = z.infer<typeof storeSchema>;
