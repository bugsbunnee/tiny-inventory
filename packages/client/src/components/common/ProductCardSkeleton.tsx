import type React from 'react';
import { Skeleton } from '../ui/skeleton';

const ProductCardSkeleton: React.FC = () => (
   <div className="flex flex-col space-y-3">
      <Skeleton className="h-50 bg-neutral-200 w-full rounded-xl" />
      <div className="space-y-2">
         <Skeleton className="h-4 bg-neutral-200 w-3/4" />
         <Skeleton className="h-4 bg-neutral-200 w-1/2" />
      </div>
      <div className="flex justify-between pt-2">
         <Skeleton className="h-8 bg-neutral-200 w-20" />
         <Skeleton className="h-8 bg-neutral-200 w-8 rounded-full" />
      </div>
   </div>
);

export default ProductCardSkeleton;
