import z from 'zod';

const CategorySchema = z.object({
   name: z.string(),
});

export type ICategory = z.infer<typeof CategorySchema>;
