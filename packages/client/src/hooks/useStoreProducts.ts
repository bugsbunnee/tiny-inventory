import useProductStore from '@/store/products';

import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/services/products';

const useStoreProducts = (storeId: number) => {
   const productQuery = useProductStore((store) => store.productQuery);

   return useQuery({
      queryKey: ['store-products', storeId, productQuery],
      queryFn: () =>
         productsApi.fetchProducts({
            params: {
               store_id: storeId,
               page_number: productQuery.page_number,
               page_size: productQuery.page_size,

               search: productQuery.search,
               min_price: productQuery.min_price,
               max_price: productQuery.max_price,
               min_stock: productQuery.min_stock,
               max_stock: productQuery.max_stock,
               category_id: productQuery.category_id,
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

export default useStoreProducts;
