import type React from 'react';
import { storeSchema, type StoreItem } from './store-schema';

import { Activity } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

import { storeApi, type Store } from '@/services/store';
import { getErrorMessage } from '@/lib/utils';

import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Button } from '../../ui/button';
import { Spinner } from '../../ui/spinner';

type Props = {
   initialData: Store | null;
   onClose: () => void;
};

const StoreForm: React.FC<Props> = ({ initialData, onClose }) => {
   const createMutation = useMutation({
      mutationFn: (store: StoreItem) => storeApi.createStore(store),
      onError: (error) => toast.error(getErrorMessage(error)),
      onSuccess: (data) => {
         toast.success(data.message);
         window.location.reload();
      },
   });

   const updateMutation = useMutation({
      mutationFn: (store: StoreItem) => storeApi.updateStore(initialData!.id, store),
      onError: (error) => toast.error(getErrorMessage(error)),
      onSuccess: (data) => {
         toast.success(data.message);
         window.location.reload();
      },
   });

   const form = useForm<StoreItem>({
      resolver: zodResolver(storeSchema),
      mode: 'onChange',
      defaultValues: {
         name: initialData?.name,
         location: initialData?.location,
      },
   });

   const handleStoreSubmit = (data: StoreItem) => {
      if (initialData) updateMutation.mutate(data);
      else createMutation.mutate(data);
   };

   return (
      <form onSubmit={form.handleSubmit(handleStoreSubmit)} className="space-y-4">
         <div className="space-y-2">
            <Label htmlFor="name">Name</Label>

            <Input
               id="name"
               className={form.formState.errors.name ? 'border-red-500' : ''}
               {...form.register('name')}
            />

            {form.formState.errors.name && <p className="text-xs text-red-500">{form.formState.errors.name.message}</p>}
         </div>

         <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <Input
               id="location"
               className={form.formState.errors.location ? 'border-red-500' : ''}
               {...form.register('location')}
            />

            {form.formState.errors.location && (
               <p className="text-xs text-red-500">{form.formState.errors.location.message}</p>
            )}
         </div>

         <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={onClose}>
               Cancel
            </Button>

            <Button type="submit" disabled={!form.formState.isValid}>
               <Activity mode={createMutation.isPending ? 'visible' : 'hidden'}>
                  <Spinner />
               </Activity>

               <Activity mode={createMutation.isPending ? 'hidden' : 'visible'}>
                  {initialData ? 'Update Store' : 'Create Store'}
               </Activity>
            </Button>
         </div>
      </form>
   );
};

export default StoreForm;
