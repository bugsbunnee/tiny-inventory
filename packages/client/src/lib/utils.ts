import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
   if (error instanceof AxiosError) {
      return error.response?.data?.message ?? error.message;
   }

   return (error as Error).message;
}
