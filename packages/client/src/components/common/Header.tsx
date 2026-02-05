import type React from 'react';

import { Bell, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import SearchBar from './SearchBar';
import useProductStore from '@/store/products';

const Header: React.FC = () => {
   const { setProductQuery } = useProductStore();

   const location = useLocation();
   const navigate = useNavigate();

   const handleInventorySearch = (text: string | undefined) => {
      setProductQuery({ search: text });

      if (text && location.pathname !== '/dashboard/products') {
         navigate('/dashboard/products');
      }
   };

   return (
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
         <div className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
               <span className="text-lg font-bold">T</span>
            </div>
            <span className="text-lg">Tiny Inventory</span>
         </div>

         <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
            <div className="relative ml-auto flex-1 sm:flex-initial">
               <SearchBar onChangeText={handleInventorySearch} />
            </div>

            <Button variant="ghost" size="icon" className="rounded-full">
               <Bell className="h-5 w-5 text-muted-foreground" />
               <span className="sr-only">Toggle notifications</span>
            </Button>

            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                        <User className="h-5 w-5" />
                     </div>
                     <span className="sr-only">Toggle user menu</span>
                  </Button>
               </DropdownMenuTrigger>

               <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         </div>
      </header>
   );
};

export default Header;
