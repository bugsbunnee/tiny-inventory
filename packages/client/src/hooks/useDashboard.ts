import { useQuery } from '@tanstack/react-query';
import { storeApi } from '@/services/store';

const useDashboard = () => {
   return useQuery({
      queryKey: ['dashboard'],
      queryFn: () => storeApi.getDashboardMetrics(),
      initialData: {
         success: true,
         message: '',
         data: {
            totalCategories: 0,
            totalInventory: 0,
            totalInventoryValue: 0,
            totalProducts: 0,
            totalStores: 0,
            storeInventory: { data: [], cursor: null },
         },
      },
   });
};

export default useDashboard;
