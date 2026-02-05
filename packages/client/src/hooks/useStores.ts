import useStore from '@/store/stores';

import { useQuery } from '@tanstack/react-query';
import { storeApi } from '@/services/store';

const useStores = () => {
   const paginationQuery = useStore((store) => store.paginationQuery);

   return useQuery({
      queryKey: ['stores', paginationQuery],
      queryFn: () =>
         storeApi.fetchStores({
            params: {
               page_number: paginationQuery.page_number,
               page_size: paginationQuery.page_size,
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

export default useStores;
