import type React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductListSkeleton: React.FC = () => {
   return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-slate-200">
         <Skeleton className="w-12 h-12 rounded-lg shrink-0" />

         <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="space-y-2">
               <Skeleton className="h-4 w-32" />
               <Skeleton className="h-3 w-24" />
            </div>

            <div className="flex items-center gap-2">
               <Skeleton className="w-4 h-4 rounded" />
               <Skeleton className="h-4 w-20" />
            </div>

            <div>
               <Skeleton className="h-4 w-16" />
            </div>

            <div>
               <Skeleton className="h-4 w-16" />
            </div>
         </div>

         <div className="flex items-center gap-2 pl-4 border-l border-slate-100">
            <Skeleton className="w-8 h-8 rounded" />
            <Skeleton className="w-8 h-8 rounded" />
         </div>
      </div>
   );
};

export default ProductListSkeleton;
