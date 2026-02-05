import axios, { type AxiosRequestConfig } from 'axios';
import type { ApiPagination, ApiResponse } from '@/lib/entities';

export type Category = {
   id: number;
   name: string;
};

export const categoriesApi = {
   fetchCategories(config: AxiosRequestConfig) {
      return axios.get<ApiResponse<ApiPagination<Category>>>(`/api/categories`, config).then((res) => res.data);
   },
};
