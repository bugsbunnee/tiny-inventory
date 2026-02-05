import React, { Activity, useCallback } from 'react';
import { Tag, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

import EmptyItem from '../common/EmptyItem';
import ImageFallback from '../common/ImageFallback';
import ProductListSkeleton from '../common/ProductListSkeleton';
import Pagination from '../common/Pagination';
import SearchBar from '../common/SearchBar';

import useProductStore from '@/store/products';
import useStoreProducts from '@/hooks/useStoreProducts';

import { Card } from '../ui/card';
import { Button } from '../ui/button';

const StoreInventoryPage: React.FC = () => {
   const { storeId } = useParams<{ storeId: string }>();
   const { productQuery, setProductQuery } = useProductStore();
   const { data, isFetching, isError } = useStoreProducts(Number(storeId));

   const navigate = useNavigate();

   const handleCreateProduct = useCallback(() => {
      setProductQuery({ isModalOpen: true });
   }, [setProductQuery]);

   if (isError) {
      return (
         <div className="space-y-6 animate-in p-8 pt-20 md:pt-8 fade-in duration-500">
            <EmptyItem
               title="An unexpected error occured"
               description="Are you sure you have the right store?"
               buttonLabel="Go Home"
               onCreate={() => navigate('/dashboard')}
            />
         </div>
      );
   }

   const totalItems = data.data.data.reduce((acc, p) => acc + p.quantity_in_stock, 0);
   const totalValue = data.data.data.reduce((acc, p) => acc + p.price * p.quantity_in_stock, 0);

   return (
      <div className="space-y-6 animate-in p-8 pt-20 md:pt-8 fade-in duration-500">
         <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
               <ArrowLeft className="h-4 w-4" />
            </Button>

            <div>
               <h1 className="text-2xl font-bold text-slate-900">Products</h1>

               {data.data.data.length > 0 && (
                  <p className="text-slate-500">
                     {data.data.data[0].store.name} • {data.data.data.length} Products • {totalItems} Items • $
                     {totalValue.toLocaleString()} Value.
                  </p>
               )}
            </div>
         </div>

         <Card className="p-4 space-y-4 md:space-y-0 md:flex items-center flex-row gap-4">
            <div className="relative flex-1">
               <SearchBar onChangeText={(text) => setProductQuery({ search: text })} />
            </div>
         </Card>

         <Activity mode={isFetching ? 'visible' : 'hidden'}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <ProductListSkeleton key={i} />
               ))}
            </div>
         </Activity>

         <Activity mode={isFetching ? 'hidden' : 'visible'}>
            <div className="space-y-2">
               {data.data.data.map((product) => (
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
                  </div>
               ))}
            </div>

            <Pagination
               pageSize={productQuery.page_size ?? 10}
               onChangePageSize={(pageSize) => setProductQuery({ page_size: pageSize, page_number: 1 })}
               onPrevPage={() => setProductQuery({ page_number: data.data.pagination.page_number - 1 })}
               onNextPage={() => setProductQuery({ page_number: data.data.pagination.page_number + 1 })}
               currentPage={data.data.pagination.page_number}
               totalPages={data.data.pagination.total_pages}
               hasNextPage={data.data.pagination.has_next_page}
               hasPreviousPage={data.data.pagination.has_previous_page}
            />

            <Activity mode={data.data.data.length === 0 ? 'visible' : 'hidden'}>
               <EmptyItem
                  title="No Inventory in the Store Yet"
                  description="You haven't allocated any products to this store yet. Get started by adding your first product."
                  buttonLabel="Create Product"
                  onCreate={handleCreateProduct}
               />
            </Activity>
         </Activity>
      </div>
   );
};

export default StoreInventoryPage;
