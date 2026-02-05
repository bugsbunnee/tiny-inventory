import React, { useMemo } from 'react';
import useDashboard from '@/hooks/useDashboard';

import {
   PieChart,
   Pie,
   ResponsiveContainer,
   Tooltip,
   BarChart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Legend,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const COLORS = [
   '#3b82f6',
   '#10b981',
   '#f59e0b',
   '#ef4444',
   '#8b5cf6',
   '#ec4899',
   '#06b6d4',
   '#f97316',
   '#14b8a6',
   '#6366f1',
];

const Charts: React.FC = () => {
   const { data } = useDashboard();

   const chartData = useMemo(() => {
      return data.data.storeInventory.data.map((item, index) => ({
         name: item.name,
         total_inventory_value: item.total_inventory_value,
         total_quantity: item.total_quantity,
         fill: COLORS[index % COLORS.length],
      }));
   }, [data]);

   return (
      <React.Fragment>
         <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
               <CardTitle>Value by Category</CardTitle>
               <CardDescription>Distribution of inventory value across categories</CardDescription>
            </CardHeader>

            <CardContent className="h-75">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius="80%"
                        outerRadius="100%"
                        cornerRadius="50%"
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="total_inventory_value"
                        nameKey="name"
                        isAnimationActive
                     ></Pie>

                     <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                     />

                     <Legend
                        verticalAlign="bottom"
                        height={36}
                        formatter={(value) => <span className="text-sm">{value}</span>}
                     />
                  </PieChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>

         <Card className="col-span-4 lg:col-span-2">
            <CardHeader>
               <CardTitle>Stock Levels</CardTitle>
               <CardDescription>Total items in stock per store</CardDescription>
            </CardHeader>

            <CardContent className="h-75">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.data.storeInventory.data}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />

                     <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />

                     <YAxis
                        stroke="#000000"
                        color="#000000"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => value.toLocaleString()}
                     />

                     <Tooltip
                        cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                     />

                     <Bar dataKey="total_quantity" fill="currentColor" radius={[8, 8, 0, 0]} />
                  </BarChart>
               </ResponsiveContainer>
            </CardContent>
         </Card>
      </React.Fragment>
   );
};

export default Charts;
