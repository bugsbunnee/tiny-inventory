import { create } from 'zustand';
import type { PaginationQuery } from './app';

export interface CategoryStore {
   paginationQuery: PaginationQuery;
   setPaginationQuery: (query: Partial<PaginationQuery>) => void;
}

const useCategoryStore = create<CategoryStore>((set) => ({
   paginationQuery: { page_number: 1, page_size: 400 },
   setPaginationQuery: (query) => set((store) => ({ paginationQuery: { ...store.paginationQuery, ...query } })),
}));

export default useCategoryStore;
