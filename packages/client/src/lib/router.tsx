import { Navigate, type RouteObject } from 'react-router-dom';

import Layout from '@/components/pages/Layout';
import ErrorPage from '@/components/pages/ErrorPage';
import HomePage from '@/components/pages/HomePage';
import ProductPage from '@/components/pages/ProductsPage';
import StoresPage from '@/components/pages/StoresPage';
import StoreInventoryPage from '@/components/pages/StoreInventoryPage';

const routes: RouteObject[] = [
   {
      path: '/dashboard',
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
         {
            index: true,
            element: <HomePage />,
         },
         {
            path: '/dashboard/stores',
            element: <StoresPage />,
         },
         {
            path: '/dashboard/stores/:storeId/inventory',
            element: <StoreInventoryPage />,
         },
         {
            path: '/dashboard/products',
            element: <ProductPage />,
         },
      ],
   },
   {
      path: '*',
      element: <Navigate to="/dashboard" replace />,
   },
];

export default routes;
