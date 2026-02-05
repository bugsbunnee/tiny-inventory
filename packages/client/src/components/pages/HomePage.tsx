import React, { Activity } from 'react';

import Charts from '../common/Charts';
import InventoryList from '../common/InventoryList';
import OverviewStats from '../common/OverviewStats';
import DashboardSkeleton from '../common/DashboardSkeleton';

import useDashboard from '@/hooks/useDashboard';

const HomePage: React.FC = () => {
   const dashboard = useDashboard();

   return (
      <React.Fragment>
         <div className="flex-1 p-4 sm:p-6 md:p-8">
            <Activity mode={dashboard.isLoading ? 'visible' : 'hidden'}>
               <DashboardSkeleton />
            </Activity>

            <Activity mode={dashboard.isLoading ? 'hidden' : 'visible'}>
               <div className="grid w-full  gap-8 md:grid-cols-2 lg:grid-cols-4">
                  <div className="col-span-4">
                     <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                     <p className="text-muted-foreground">Overview of your inventory across all locations.</p>
                  </div>

                  <div className="col-span-4">
                     <OverviewStats />
                  </div>

                  <Charts />

                  <InventoryList />
               </div>
            </Activity>
         </div>
      </React.Fragment>
   );
};

export default HomePage;
