import z from 'zod';

export const CursorQuerySchema = z.object({
   limit: z.number().positive().optional(),
   cursor: z.number().positive().optional(),
});

export const PaginationQuerySchema = z.object({
   page_number: z.coerce.number().positive().default(1).optional(),
   page_size: z.coerce.number().positive().default(10).optional(),
});

export const PaginationMetaSchema = z.object({
   page_number: z.number().positive(),
   page_size: z.number().positive(),
   total_count: z.number().nonnegative(),
   total_pages: z.number().nonnegative(),
   has_next_page: z.boolean(),
   has_previous_page: z.boolean(),
});

export type CursorPaginationQuery = z.infer<typeof CursorQuerySchema>;

export type OffsetPaginationMeta = z.infer<typeof PaginationMetaSchema>;

export type OffsetPaginationQuery = z.infer<typeof PaginationQuerySchema>;

export type OffsetPaginatedResponse<T> = {
   data: T[];
   pagination: OffsetPaginationMeta;
};

export type CursorPaginatedResponse<T> = {
   data: T[];
   next_cursor: number | null;
};
