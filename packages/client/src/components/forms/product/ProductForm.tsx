import type React from 'react';

import { Activity, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { productsApi, type Product } from '@/services/products';

import useCategories from '@/hooks/useCategories';
import useStores from '@/hooks/useStores';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Spinner } from '../../ui/spinner';
import { productSchema, type ProductItem } from './product-schema';

type Props = {
   initialData: Product | null;
   onClose: () => void;
};

const ProductForm: React.FC<Props> = ({ initialData, onClose }) => {
   const categories = useCategories();
   const stores = useStores();

   const createMutation = useMutation({
      mutationFn: (data: ProductItem) => productsApi.createProduct(data),
      onError: (error) => toast.error(error.message),
      onSuccess: (data) => {
         toast.success(data.message);
         window.location.reload();
      },
   });

   const updateMutation = useMutation({
      mutationFn: (product: ProductItem) => productsApi.updateProduct(initialData!.id, product),
      onError: (error) => toast.error(error.message),
      onSuccess: (data) => {
         toast.success(data.message);
         window.location.reload();
      },
   });

   const form = useForm<ProductItem>({
      resolver: zodResolver(productSchema),
      mode: 'onChange',
      defaultValues: {
         name: initialData?.name,
         price: initialData?.price,
         description: initialData?.description,
         category_id: initialData?.category?.id,
         store_id: initialData?.store?.id,
         image_url: initialData?.image_url,
         quantity_in_stock: initialData?.quantity_in_stock,
      },
   });

   const isLoading = useMemo(() => {
      return createMutation.isPending || updateMutation.isPending;
   }, [createMutation.isPending, updateMutation.isPending]);

   const handleProductSubmit = (data: ProductItem) => {
      const productItem: ProductItem = {
         image_url: data.image_url ? data.image_url : undefined,
         name: data.name,
         description: data.description,
         store_id: data.store_id,
         category_id: data.category_id,
         price: data.price,
         quantity_in_stock: data.quantity_in_stock,
      };

      if (initialData) updateMutation.mutate(productItem);
      else createMutation.mutate(productItem);
   };

   return (
      <form onSubmit={form.handleSubmit(handleProductSubmit)} className="space-y-4">
         <div className="space-y-2">
            <Label htmlFor="name">Product Name</Label>

            <Input
               id="name"
               className={form.formState.errors.name ? 'border-red-500' : ''}
               placeholder="Enter product name"
               {...form.register('name')}
            />

            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label htmlFor="category">Category</Label>

               <Controller
                  name="category_id"
                  control={form.control}
                  render={({ field }) => (
                     <Select value={`${field.value}`} onValueChange={(value) => field.onChange(Number(value))}>
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select Category" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                           <SelectGroup>
                              {categories.data.data.data.map((category) => (
                                 <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                 </SelectItem>
                              ))}
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  )}
               />

               {form.formState.errors.category_id && (
                  <p className="text-xs text-red-500">{form.formState.errors.category_id.message}</p>
               )}
            </div>

            <div className="space-y-2">
               <Label htmlFor="store">Store</Label>

               <Controller
                  name="store_id"
                  control={form.control}
                  render={({ field }) => (
                     <Select value={`${field.value}`} onValueChange={(value) => field.onChange(Number(value))}>
                        <SelectTrigger className="w-full">
                           <SelectValue placeholder="Select Store" />
                        </SelectTrigger>

                        <SelectContent position="item-aligned">
                           <SelectGroup>
                              {stores.data.data.data.map((store) => (
                                 <SelectItem key={store.id} value={store.id.toString()}>
                                    {store.name}
                                 </SelectItem>
                              ))}
                           </SelectGroup>
                        </SelectContent>
                     </Select>
                  )}
               />

               {form.formState.errors.store_id && (
                  <p className="text-xs text-red-500">{form.formState.errors.store_id.message}</p>
               )}
            </div>
         </div>

         <div className="space-y-2">
            <Label htmlFor="description">Product Description</Label>

            <Input
               id="description"
               className={form.formState.errors.description ? 'border-red-500' : ''}
               placeholder="Enter product description"
               {...form.register('description')}
            />

            {form.formState.errors.description && (
               <p className="text-xs text-red-500">{form.formState.errors.description.message}</p>
            )}
         </div>

         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
               <Label htmlFor="price">Price (USD)</Label>

               <Input
                  id="price"
                  type="number"
                  className={form.formState.errors.price ? 'border-red-500' : ''}
                  placeholder="0.00"
                  step="0.01"
                  {...form.register('price', { valueAsNumber: true })}
               />

               {form.formState.errors.price && (
                  <p className="text-xs text-red-500">{form.formState.errors.price.message}</p>
               )}
            </div>

            <div className="space-y-2">
               <Label htmlFor="quantity_in_stock">Stock Quantity</Label>

               <Input
                  id="quantity_in_stock"
                  type="number"
                  placeholder="e.g. 5"
                  {...form.register('quantity_in_stock', { valueAsNumber: true })}
               />

               {form.formState.errors.quantity_in_stock && (
                  <p className="text-xs text-red-500">{form.formState.errors.quantity_in_stock.message}</p>
               )}
            </div>
         </div>

         <div className="space-y-2">
            <Label htmlFor="image_url">Image URL (Optional)</Label>

            <Input id="image_url" placeholder="https://images.unsplash.com/..." {...form.register('image_url')} />

            <p className="text-xs text-slate-400">Paste an Unsplash URL for demo purposes</p>

            {form.formState.errors.image_url && (
               <p className="text-xs text-red-500">{form.formState.errors.image_url.message}</p>
            )}
         </div>

         <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={onClose}>
               Cancel
            </Button>

            <Button type="submit" disabled={!form.formState.isValid || isLoading}>
               <Activity mode={isLoading ? 'visible' : 'hidden'}>
                  <Spinner />
               </Activity>

               <Activity mode={isLoading ? 'hidden' : 'visible'}>
                  {initialData ? 'Update Product' : 'Create Product'}
               </Activity>
            </Button>
         </div>
      </form>
   );
};

export default ProductForm;
