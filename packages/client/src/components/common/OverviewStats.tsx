import type React from 'react';
import useDashboard from '@/hooks/useDashboard';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Store, Layers, DollarSign } from 'lucide-react';

const OverviewStats: React.FC = () => {
   const { data } = useDashboard();

   return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
               <Store className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
               <div className="text-2xl font-bold">{data.data.totalStores}</div>
               <p className="text-xs text-muted-foreground">Active locations</p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Total Products</CardTitle>
               <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
               <div className="text-2xl font-bold">{data.data.totalProducts}</div>
               <p className="text-xs text-muted-foreground">Unique SKUs across stores</p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Total Inventory Value</CardTitle>
               <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
               <div className="text-2xl font-bold">${data.data.totalInventoryValue.toLocaleString()}</div>
               <p className="text-xs text-muted-foreground">
                  {data.data.totalInventory.toLocaleString()} items in stock
               </p>
            </CardContent>
         </Card>

         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-sm font-medium">Categories</CardTitle>
               <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>

            <CardContent>
               <div className="text-2xl font-bold">{data.data.totalCategories}</div>
               <p className="text-xs text-muted-foreground">Product classifications</p>
            </CardContent>
         </Card>
      </div>
   );
};

export default OverviewStats;
