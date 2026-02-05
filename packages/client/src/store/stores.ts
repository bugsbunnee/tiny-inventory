import { create } from 'zustand';
import type { PaginationQuery } from './app';
import type { Store as StoreItem } from '../services/store';

interface StoreQuery {
   search?: string;
   isModalOpen: boolean;
   selectedStoreToView: StoreItem | null;
   selectedStoreToDelete: StoreItem | null;
   selectedStoreToEdit: StoreItem | null;
}

export interface Store {
   storeQuery: StoreQuery;
   paginationQuery: PaginationQuery;
   setPaginationQuery: (query: Partial<PaginationQuery>) => void;
   setStoreQuery: (query: Partial<StoreQuery>) => void;
}

const useStore = create<Store>((set) => ({
   storeQuery: {
      isModalOpen: false,
      selectedStoreToEdit: null,
      selectedStoreToDelete: null,
      selectedStoreToView: null,
   },
   paginationQuery: { page_number: 1, page_size: 100 },
   setPaginationQuery: (query) => set((store) => ({ paginationQuery: { ...store.paginationQuery, ...query } })),
   setStoreQuery: (query) => set((store) => ({ storeQuery: { ...store.storeQuery, ...query } })),
}));

export default useStore;
