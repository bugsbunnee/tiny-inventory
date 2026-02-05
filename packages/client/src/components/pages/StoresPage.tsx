import React, { Activity, useCallback } from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { MapPin, Store as StoreIcon, MoreHorizontal, X, FileWarning } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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

import EmptyItem from '../common/EmptyItem';
import Pagination from '../common/Pagination';
import StoreForm from '../forms/store/StoreForm';
import StoreSkeleton from '../common/StoreSkeleton';

import useStores from '@/hooks/useStores';
import useStore from '@/store/stores';

import { toast } from 'sonner';
import { Spinner } from '../ui/spinner';
import { useMutation } from '@tanstack/react-query';
import { storeApi } from '@/services/store';
import { getErrorMessage } from '@/lib/utils';

const StoresPage: React.FC = () => {
   const { data, isFetching } = useStores();
   const { paginationQuery, storeQuery, setStoreQuery, setPaginationQuery } = useStore();
   const { mutate, isPending } = useMutation({
      mutationFn: (storeId: number) => storeApi.deleteStore(storeId),
      onSuccess: (data) => {
         toast.success(data.message);
         window.location.reload();
      },
      onError: (error) => toast.error(getErrorMessage(error)),
   });

   const navigate = useNavigate();

   const handleCloseModal = useCallback(() => {
      setStoreQuery({
         selectedStoreToEdit: null,
         selectedStoreToDelete: null,
         selectedStoreToView: null,
         isModalOpen: false,
      });
   }, [setStoreQuery]);

   return (
      <React.Fragment>
         <AlertDialog open={!!storeQuery.selectedStoreToDelete}>
            <AlertDialogContent>
               <AlertDialogHeader>
                  <AlertDialogMedia>
                     <FileWarning />
                  </AlertDialogMedia>

                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

                  <AlertDialogDescription>
                     This action cannot be undone. This will permanently delete the store
                  </AlertDialogDescription>
               </AlertDialogHeader>

               <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleCloseModal}>Cancel</AlertDialogCancel>

                  {storeQuery.selectedStoreToDelete && (
                     <AlertDialogAction onClick={() => mutate(storeQuery.selectedStoreToDelete!.id)}>
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
            <Activity mode={isFetching ? 'hidden' : 'visible'}>
               <div className="space-y-6">
                  <div className="flex items-center justify-between">
                     <div>
                        <h2 className="text-2xl font-bold tracking-tight">Stores</h2>
                        <p className="text-muted-foreground">Manage your store locations.</p>
                     </div>

                     <Button onClick={() => setStoreQuery({ isModalOpen: true })}>
                        <StoreIcon className="mr-2 h-4 w-4" />
                        Add Store
                     </Button>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                     {data.data.data.map((store) => (
                        <Card key={store.id} className="group overflow-hidden transition-all hover:shadow-md py-0">
                           <CardHeader className="flex flex-row items-start justify-between space-y-0 bg-muted/60 pb-4">
                              <div className="flex items-center gap-3 pt-6">
                                 <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background border shadow-sm">
                                    <StoreIcon className="h-5 w-5 text-primary" />
                                 </div>

                                 <div className="space-y-1">
                                    <CardTitle className="text-base font-semibold leading-none">{store.name}</CardTitle>
                                    <p className="text-xs text-muted-foreground">ID: {store.id}</p>
                                 </div>
                              </div>

                              <DropdownMenu>
                                 <DropdownMenuTrigger asChild>
                                    <Button
                                       variant="ghost"
                                       className="h-8 w-8 mt-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                       <span className="sr-only">Open menu</span>
                                       <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                 </DropdownMenuTrigger>

                                 <DropdownMenuContent align="end">
                                    <DropdownMenuItem
                                       onClick={() => setStoreQuery({ isModalOpen: true, selectedStoreToEdit: store })}
                                    >
                                       Edit Store
                                    </DropdownMenuItem>

                                    <DropdownMenuItem
                                       className="text-destructive"
                                       onClick={() => setStoreQuery({ selectedStoreToDelete: store })}
                                    >
                                       Delete
                                    </DropdownMenuItem>
                                 </DropdownMenuContent>
                              </DropdownMenu>
                           </CardHeader>

                           <CardContent className="p-6">
                              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
                                    <MapPin className="h-4 w-4" />
                                 </div>

                                 <span>{store.location}</span>
                              </div>
                           </CardContent>

                           <CardFooter className="bg-muted/60 p-4">
                              <Button
                                 onClick={() => navigate(`/dashboard/stores/${store.id}/inventory`)}
                                 variant="outline"
                                 className="w-full"
                              >
                                 Manage Inventory
                              </Button>
                           </CardFooter>
                        </Card>
                     ))}
                  </div>

                  <Pagination
                     pageSize={paginationQuery.page_size ?? 10}
                     onChangePageSize={(pageSize) => setPaginationQuery({ page_size: pageSize, page_number: 1 })}
                     onPrevPage={() => setPaginationQuery({ page_number: data.data.pagination.page_number - 1 })}
                     onNextPage={() => setPaginationQuery({ page_number: data.data.pagination.page_number + 1 })}
                     currentPage={data.data.pagination.page_number}
                     totalPages={data.data.pagination.total_pages}
                     hasNextPage={data.data.pagination.has_next_page}
                     hasPreviousPage={data.data.pagination.has_previous_page}
                  />

                  <Activity mode={data.data.data.length === 0 ? 'visible' : 'hidden'}>
                     <EmptyItem
                        title="No Stores Yet"
                        description="You haven't created any stores yet. Get started by creating your first store."
                        buttonLabel="Create Store"
                        onCreate={() => {}}
                     />
                  </Activity>
               </div>
            </Activity>

            {storeQuery.isModalOpen && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold">
                           {storeQuery.selectedStoreToEdit ? 'Edit Store' : 'Add New Store'}
                        </h2>

                        <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                           <X size={20} />
                        </button>
                     </div>

                     <StoreForm initialData={storeQuery.selectedStoreToEdit} onClose={handleCloseModal} />
                  </div>
               </div>
            )}

            <Activity mode={isFetching ? 'visible' : 'hidden'}>
               <StoreSkeleton />
            </Activity>
         </div>
      </React.Fragment>
   );
};

export default StoresPage;
