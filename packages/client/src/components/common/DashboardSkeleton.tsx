import type React from 'react';

import { Skeleton } from '../ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const DashboardSkeleton: React.FC = () => {
   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
         <div className="col-span-4 space-y-2 mb-2">
            <Skeleton className="h-8 w-50" />
            <Skeleton className="h-4 w-75" />
         </div>

         {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-25" />
                  <Skeleton className="h-4 w-4 rounded-full" />
               </CardHeader>
               <CardContent>
                  <Skeleton className="h-8 w-15 mb-1" />
                  <Skeleton className="h-3 w-30" />
               </CardContent>
            </Card>
         ))}

         <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
               <Skeleton className="h-5 w-35 mb-2" />
               <Skeleton className="h-4 w-60" />
            </CardHeader>
            <CardContent>
               <Skeleton className="h-75 w-full rounded-md" />
            </CardContent>
         </Card>

         <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
               <Skeleton className="h-5 w-35 mb-2" />
               <Skeleton className="h-4 w-60" />
            </CardHeader>

            <CardContent>
               <Skeleton className="h-75 w-full rounded-md" />
            </CardContent>
         </Card>

         <Card className="col-span-4">
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div className="space-y-2">
                     <Skeleton className="h-5 w-37.5" />
                     <Skeleton className="h-4 w-62.5" />
                  </div>
                  <Skeleton className="h-10 w-62.5" />
               </div>
            </CardHeader>

            <CardContent>
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <Skeleton className="h-4 w-25" />
                     <Skeleton className="h-4 w-25" />
                     <Skeleton className="h-4 w-25" />
                     <Skeleton className="h-4 w-25" />
                     <Skeleton className="h-4 w-25" />
                     <Skeleton className="h-4 w-20" />
                  </div>

                  {Array.from({ length: 5 }).map((_, i) => (
                     <Skeleton key={i} className="h-12 w-full" />
                  ))}
               </div>
            </CardContent>
         </Card>
      </div>
   );
};

export default DashboardSkeleton;
