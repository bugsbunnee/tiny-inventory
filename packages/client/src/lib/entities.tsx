export type ApiPagination<T> = {
   data: T[];
   pagination: {
      page_number: number;
      page_size: number;
      total_count: number;
      total_pages: number;
      has_next_page: boolean;
      has_previous_page: boolean;
   };
};

export type ApiResponse<T> = {
   success: boolean;
   message: string;
   data: T;
};
