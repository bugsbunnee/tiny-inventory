import type React from 'react';
import _ from 'lodash';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

const StoreSkeleton: React.FC = () => {
   return (
      <div className="space-y-6 animate-pulse">
         <div className="flex items-center justify-between">
            <div className="space-y-2">
               <Skeleton className="h-8 w-37.5" />
               <Skeleton className="h-4 w-62.5" />
            </div>

            <Skeleton className="h-10 w-30" />
         </div>

         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {_.range(1, 9).map((_, i) => (
               <Card key={i} className="overflow-hidden">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 bg-muted/10 pb-4">
                     <div className="flex items-center gap-3 w-full">
                        <Skeleton className="h-10 w-10 rounded-lg" />
                        <div className="space-y-2 flex-1">
                           <Skeleton className="h-4 w-3/4" />
                           <Skeleton className="h-3 w-1/2" />
                        </div>
                     </div>
                  </CardHeader>

                  <CardContent className="p-6">
                     <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-4 w-30" />
                     </div>
                  </CardContent>
                  <CardFooter className="bg-muted/10 p-4">
                     <Skeleton className="h-9 w-full rounded-md" />
                  </CardFooter>
               </Card>
            ))}
         </div>
      </div>
   );
};

export default StoreSkeleton;
