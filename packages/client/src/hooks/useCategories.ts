import useCategoryStore from '@/store/categories';

import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/services/categories';

const useCategories = () => {
   const categoryQuery = useCategoryStore((store) => store.paginationQuery);

   return useQuery({
      queryKey: ['categories', categoryQuery],
      queryFn: () =>
         categoriesApi.fetchCategories({
            params: {
               page_number: categoryQuery.page_number,
               page_size: categoryQuery.page_size,
            },
         }),
      initialData: {
         success: true,
         message: '',
         data: {
            data: [],
            pagination: {
               page_number: 1,
               page_size: 10,
               has_next_page: true,
               has_previous_page: false,
               total_count: 0,
               total_pages: 1,
            },
         },
      },
   });
};

export default useCategories;
