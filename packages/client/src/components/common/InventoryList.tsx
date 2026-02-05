import React, { Activity } from 'react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowRightIcon } from 'lucide-react';

import useDashboard from '@/hooks/useDashboard';

const InventoryList: React.FC = () => {
   const navigate = useNavigate();
   const dashboard = useDashboard();

   return (
      <Card className="col-span-4">
         <CardHeader>
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
               <div className="flex-1">
                  <CardTitle>Inventory by Store</CardTitle>
                  <CardDescription className="mt-1">Overview of stock levels and value per location.</CardDescription>
               </div>

               <div className="relative">
                  <Button className="text-xs uppercase" onClick={() => navigate('/dashboard/stores')}>
                     View all stores <ArrowRightIcon />
                  </Button>
               </div>
            </div>
         </CardHeader>

         <CardContent>
            <div className="rounded-lg border overflow-hidden">
               <Table>
                  <TableHeader>
                     <TableRow className="bg-muted/50 uppercase hover:bg-muted/50">
                        <TableHead className="p-4">Store Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead className="text-right text-foreground p-4">Products (SKUs)</TableHead>
                        <TableHead className="text-right text-foreground p-4">Total Items</TableHead>
                        <TableHead className="text-right text-foreground p-4">Total Value</TableHead>
                        <TableHead className="text-right text-foreground p-4">Status</TableHead>
                     </TableRow>
                  </TableHeader>

                  <TableBody>
                     <Activity mode={dashboard.data.data.storeInventory.data.length > 0 ? 'visible' : 'hidden'}>
                        {dashboard.data.data.storeInventory.data.map((store) => (
                           <TableRow key={store.id}>
                              <TableCell className="font-medium p-4">{store.name}</TableCell>
                              <TableCell className="text-muted-foreground p-4">{store.location}</TableCell>
                              <TableCell className="text-right p-4">{store.total_products}</TableCell>
                              <TableCell className="text-right p-4">{store.total_quantity.toLocaleString()}</TableCell>
                              <TableCell className="text-right p-4">
                                 ${store.total_inventory_value.toLocaleString()}
                              </TableCell>
                              <TableCell className="text-right py-4">
                                 <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Active
                                 </Badge>
                              </TableCell>
                           </TableRow>
                        ))}
                     </Activity>

                     <Activity mode={dashboard.data.data.storeInventory.data.length === 0 ? 'visible' : 'hidden'}>
                        <TableRow>
                           <TableCell colSpan={6} className="h-24 text-center">
                              No stores found.
                           </TableCell>
                        </TableRow>
                     </Activity>
                  </TableBody>
               </Table>
            </div>
         </CardContent>
      </Card>
   );
};

export default InventoryList;
