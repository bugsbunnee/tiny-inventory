import React, { Activity, useCallback } from 'react';
import { toast } from 'sonner';

import { Plus, Tag, Trash2, Edit2, X, LayoutGrid, List as ListIcon, FileWarning } from 'lucide-react';
import { motion } from 'motion/react';
import { useMutation } from '@tanstack/react-query';

import EmptyItem from '../common/EmptyItem';
import ImageFallback from '../common/ImageFallback';
import ProductCardSkeleton from '../common/ProductCardSkeleton';
import ProductForm from '../forms/product/ProductForm';
import Pagination from '../common/Pagination';
import SearchBar from '../common/SearchBar';

import useCategories from '@/hooks/useCategories';
import useProducts from '@/hooks/useProducts';
import useProductStore from '@/store/products';
import useStores from '@/hooks/useStores';

import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Spinner } from '../ui/spinner';
import { productsApi, type Product } from '@/services/products';
import { getErrorMessage } from '@/lib/utils';

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogMedia,
   AlertDialogTitle,
} from '../ui/alert-dialog';

const ProductPage: React.FC = () => {
   const { productQuery, setProductQuery } = useProductStore();

   const { mutate: deleteProduct, isPending } = useMutation({
      mutationFn: (productId: number) => productsApi.deleteProduct(productId),
      onSuccess: (data) => {
         toast.success(data.message);
         window.location.reload();
      },
      onError: (error) => toast.error(getErrorMessage(error)),
   });

   const products = useProducts();
   const stores = useStores();
   const categories = useCategories();

   const handleCreateProduct = useCallback(() => {
      setProductQuery({ isModalOpen: true });
   }, [setProductQuery]);

   const handleEditProduct = useCallback(
      (product: Product) => {
         setProductQuery({ selectedProductToEdit: product, isModalOpen: true });
      },
      [setProductQuery]
   );

   const handleCloseModal = useCallback(() => {
      setProductQuery({
         selectedProductToEdit: null,
         selectedProductToDelete: null,
         isModalOpen: false,
      });
   }, [setProductQuery]);

   const handleValueTrim = useCallback((value: string) => {
      return value === '0' ? undefined : Number(value);
   }, []);

   return (
      <React.Fragment>
         <AlertDialog open={!!productQuery.selectedProductToDelete}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogMedia>
                     <FileWarning />
                  </AlertDialogMedia>

                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete the product
                  </AlertDialogDescription>
               </AlertDialogHeader>

               <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>

                  {productQuery.selectedProductToDelete && (
                     <AlertDialogAction onClick={() => deleteProduct(productQuery.selectedProductToDelete!.id)}>
                        <Activity mode={isPending ? 'visible' : 'hidden'}>
                           <Spinner />
                        </Activity>

                        <Activity mode={isPending ? 'hidden' : 'visible'}>Continue</Activity>
                     </AlertDialogAction>
                  )}
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>

         <div className="space-y-6 animate-in p-8 pt-20 md:pt-8 fade-in duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
               <div>
                  <h1 className="text-2xl font-bold text-slate-900">Products</h1>
                  <p className="text-slate-500">Manage inventory across all stores.</p>
               </div>

               <Button onClick={handleCreateProduct}>
                  <Plus size={16} className="mr-2" />
                  Add Product
               </Button>
            </div>

            <Card className="p-4 space-y-4 md:space-y-0 md:flex items-center flex-row gap-4">
               <div className="relative flex-1">
                  <SearchBar onChangeText={(text) => setProductQuery({ search: text })} />
               </div>

               <div className="flex flex-wrap gap-2">
                  <Select
                     value={productQuery.category_id ? productQuery.category_id.toString() : '0'}
                     onValueChange={(value) => setProductQuery({ category_id: handleValueTrim(value) })}
                  >
                     <SelectTrigger className="p-5 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 outline-none bg-white">
                        <SelectValue placeholder="Stores" />
                     </SelectTrigger>

                     <SelectContent position="item-aligned">
                        <SelectGroup>
                           <SelectItem value="0">All Categories</SelectItem>

                           {categories.data.data.data.map((category) => (
                              <SelectItem key={category.id} value={category.id.toString()}>
                                 {category.name}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>

                  <Select
                     value={productQuery.store_id ? productQuery.store_id.toString() : '0'}
                     onValueChange={(value) => setProductQuery({ store_id: handleValueTrim(value) })}
                  >
                     <SelectTrigger className="p-5 rounded-md border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 outline-none bg-white">
                        <SelectValue placeholder="Stores" />
                     </SelectTrigger>

                     <SelectContent position="item-aligned">
                        <SelectGroup>
                           <SelectItem value="0">All Stores</SelectItem>

                           {stores.data.data.data.map((store) => (
                              <SelectItem key={store.id} value={store.id.toString()}>
                                 {store.name}
                              </SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>

                  <div className="flex border border-slate-200 rounded-md overflow-hidden">
                     <button
                        onClick={() => setProductQuery({ viewMode: 'grid' })}
                        className={`p-2 ${productQuery.viewMode === 'grid' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-400'}`}
                     >
                        <LayoutGrid size={18} />
                     </button>

                     <div className="w-px bg-slate-200" />

                     <button
                        onClick={() => setProductQuery({ viewMode: 'list' })}
                        className={`p-2 ${productQuery.viewMode === 'list' ? 'bg-slate-100 text-slate-900' : 'bg-white text-slate-400'}`}
                     >
                        <ListIcon size={18} />
                     </button>
                  </div>
               </div>
            </Card>

            <Activity mode={products.isFetching ? 'visible' : 'hidden'}>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                     <ProductCardSkeleton key={i} />
                  ))}
               </div>
            </Activity>

            <Activity mode={products.isFetching ? 'hidden' : 'visible'}>
               <Activity mode={productQuery.viewMode === 'grid' ? 'visible' : 'hidden'}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                     {products.data.data.data.map((product) => (
                        <motion.div
                           layout
                           key={product.id}
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           exit={{ opacity: 0, scale: 0.95 }}
                           transition={{ duration: 0.2 }}
                        >
                           <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all group border-slate-200 py-0">
                              <div className="relative aspect-square overflow-hidden bg-slate-100">
                                 <ImageFallback
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                 />

                                 <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold shadow-sm">
                                    ${product.price.toFixed(2)}
                                 </div>

                                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button size="sm" variant="secondary" onClick={() => handleEditProduct(product)}>
                                       Edit
                                    </Button>

                                    <Button
                                       size="sm"
                                       variant="destructive"
                                       onClick={() => setProductQuery({ selectedProductToDelete: product })}
                                    >
                                       Delete
                                    </Button>
                                 </div>
                              </div>

                              <div className="p-4 flex-1 flex flex-col">
                                 <div className="flex justify-between items-start mb-2">
                                    <div>
                                       <h3 className="font-semibold text-slate-900 line-clamp-1" title={product.name}>
                                          {product.name}
                                       </h3>
                                       <p className="text-xs text-slate-500">{product.store.name}</p>
                                    </div>
                                 </div>
                                 <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                                       {product.category.name}
                                    </span>

                                    <span
                                       className={`text-xs px-2 py-1 rounded-full ${product.quantity_in_stock < 10 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}
                                    >
                                       {product.quantity_in_stock} in stock
                                    </span>
                                 </div>
                              </div>
                           </Card>
                        </motion.div>
                     ))}
                  </div>
               </Activity>

               <Activity mode={productQuery.viewMode === 'list' ? 'visible' : 'hidden'}>
                  <div className="space-y-2">
                     {products.data.data.data.map((product) => (
                        <div
                           key={product.id}
                           className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                        >
                           <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                              <ImageFallback src={product.image_url} className="w-full h-full object-cover" />
                           </div>

                           <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                              <div>
                                 <h3 className="font-medium text-slate-900 truncate">{product.name}</h3>
                                 <p className="text-xs text-slate-500 truncate">{product.store.name}</p>
                              </div>

                              <div className="flex items-center gap-2">
                                 <Tag size={14} className="text-slate-400" />
                                 <span className="text-sm text-slate-600">{product.category.name}</span>
                              </div>

                              <div className="text-sm">
                                 <span
                                    className={`font-medium ${product.quantity_in_stock < 10 ? 'text-amber-600' : 'text-slate-600'}`}
                                 >
                                    {product.quantity_in_stock} Units
                                 </span>
                              </div>
                              <div className="text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</div>
                           </div>

                           <div className="flex items-center gap-2 pl-4 border-l border-slate-100">
                              <button
                                 onClick={() => handleEditProduct(product)}
                                 className="p-2 text-slate-400 hover:text-indigo-600"
                              >
                                 <Edit2 size={16} />
                              </button>

                              <button
                                 onClick={() => setProductQuery({ selectedProductToDelete: product })}
                                 className="p-2 text-slate-400 hover:text-red-600"
                              >
                                 <Trash2 size={16} />
                              </button>
                           </div>
                        </div>
                     ))}
                  </div>
               </Activity>

               <Pagination
                  pageSize={productQuery.page_size ?? 10}
                  onChangePageSize={(pageSize) => setProductQuery({ page_size: pageSize, page_number: 1 })}
                  onPrevPage={() => setProductQuery({ page_number: products.data.data.pagination.page_number - 1 })}
                  onNextPage={() => setProductQuery({ page_number: products.data.data.pagination.page_number + 1 })}
                  currentPage={products.data.data.pagination.page_number}
                  totalPages={products.data.data.pagination.total_pages}
                  hasNextPage={products.data.data.pagination.has_next_page}
                  hasPreviousPage={products.data.data.pagination.has_previous_page}
               />

               <Activity mode={products.data.data.data.length === 0 ? 'visible' : 'hidden'}>
                  <EmptyItem
                     title="No Products Yet"
                     description="You haven't created any products yet. Get started by creating your first product."
                     buttonLabel="Create Product"
                     onCreate={handleCreateProduct}
                  />
               </Activity>
            </Activity>

            {productQuery.isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                           {productQuery.selectedProductToEdit ? 'Edit Product' : 'Add New Product'}
                        </h2>

                        <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                           <X size={20} />
                        </button>
                     </div>

                     <ProductForm initialData={productQuery.selectedProductToEdit} onClose={handleCloseModal} />
                  </div>
               </div>
            )}
         </div>
      </React.Fragment>
   );
};

export default ProductPage;
