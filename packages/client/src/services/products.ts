import axios, { type AxiosRequestConfig } from 'axios';
import type { ApiPagination, ApiResponse } from '@/lib/entities';

export type Product = {
   id: number;
   name: string;
   price: number;
   image_url: string;
   quantity_in_stock: number;
   description: string;
   category: {
      id: number;
      name: string;
   };
   store: {
      id: number;
      name: string;
   };
};

export const productsApi = {
   fetchProducts(config: AxiosRequestConfig) {
      return axios.get<ApiResponse<ApiPagination<Product>>>(`/api/products`, config).then((res) => res.data);
   },

   createProduct<T>(product: T) {
      return axios.post<ApiResponse<Product>>(`/api/products`, product).then((res) => res.data);
   },

   updateProduct<T>(productId: number, product: T) {
      return axios.put<ApiResponse<Product>>(`/api/products/${productId}`, product).then((res) => res.data);
   },

   deleteProduct(productId: number) {
      return axios.delete<ApiResponse<null>>('/api/products/' + productId).then((res) => res.data);
   },
};
