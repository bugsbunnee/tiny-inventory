import axios, { type AxiosRequestConfig } from 'axios';
import type { ApiPagination, ApiResponse } from '@/lib/entities';

interface IStoreAggregation {
   id: number;
   name: string;
   location: string;
   total_products: number;
   total_quantity: number;
   total_inventory_value: number;
}

interface DashboardMetrics {
   totalStores: number;
   totalProducts: number;
   totalCategories: number;
   totalInventory: number;
   totalInventoryValue: number;
   storeInventory: { data: IStoreAggregation[]; cursor: number | null };
}

export type Store = {
   id: number;
   name: string;
   location: string;
   created_at: Date;
   updated_at: Date;
};

export const storeApi = {
   fetchStores(config: AxiosRequestConfig) {
      return axios.get<ApiResponse<ApiPagination<Store>>>(`/api/stores`, config).then((res) => res.data);
   },

   createStore<T>(store: T) {
      return axios.post<ApiResponse<Store>>(`/api/stores`, store).then((res) => res.data);
   },

   deleteStore(storeId: number) {
      return axios.delete<ApiResponse<null>>('/api/stores/' + storeId).then((res) => res.data);
   },

   updateStore<T>(storeId: number, store: T) {
      return axios.put<ApiResponse<Store>>(`/api/stores/${storeId}`, store).then((res) => res.data);
   },

   getDashboardMetrics() {
      return axios.get<ApiResponse<DashboardMetrics>>(`/api/dashboard`).then((res) => res.data);
   },
};
