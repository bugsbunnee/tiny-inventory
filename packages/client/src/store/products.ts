import { create } from 'zustand';

import type { Product } from '@/services/products';
import type { PaginationQuery } from './app';

export interface ProductQuery extends PaginationQuery {
   viewMode: 'grid' | 'list';
   isModalOpen: boolean;
   selectedProductToEdit: Product | null;
   selectedProductToDelete: Product | null;
   search?: string;
   min_price?: number;
   max_price?: number;
   min_stock?: number;
   max_stock?: number;
   category_id?: number;
   store_id?: number;
}

export interface ProductQueryStore {
   productQuery: ProductQuery;
   setProductQuery: (query: Partial<ProductQuery>) => void;
}

const useProductStore = create<ProductQueryStore>((set) => ({
   productQuery: {
      viewMode: 'grid',
      isModalOpen: false,
      selectedProductToEdit: null,
      selectedProductToDelete: null,
      page_size: 10,
   },
   setProductQuery: (query) => set((store) => ({ productQuery: { ...store.productQuery, ...query } })),
}));

export default useProductStore;
