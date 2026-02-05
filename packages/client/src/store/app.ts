import { create } from 'zustand';

export interface App {
   isModalOpen: boolean;
}

export interface AppStore {
   app: App;
   setApp: (query: Partial<App>) => void;
}

export interface PaginationQuery {
   page_number?: number;
   page_size?: number;
}

const useAppStore = create<AppStore>((set) => ({
   app: { isModalOpen: false },
   setApp: (query) => set((store) => ({ app: { ...store.app, ...query } })),
}));

export default useAppStore;
