import React from 'react';

import { LayoutDashboard, Store, Package, Menu, X, type LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAppStore from '@/store/app';

type NavItem = {
   icon: LucideIcon;
   label: string;
   id: 'dashboard' | 'stores' | 'products';
   route: string;
};

const NavBar: React.FC = () => {
   const navigate = useNavigate();
   const appStore = useAppStore();
   const location = useLocation();

   return (
      <React.Fragment>
         <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
            <div className="h-16 py-3 px-6 border-b border-slate-100">
               <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
                     T
                  </div>
                  <span className="text-xl font-bold tracking-tight text-slate-900">TinyInv</span>
               </div>
            </div>

            <nav className="flex-1 p-4 space-y-1">
               {navItems.map((item) => (
                  <button
                     key={item.id}
                     onClick={() => navigate(item.route)}
                     className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        location.pathname === item.route
                           ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10'
                           : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                     }`}
                  >
                     <item.icon size={20} />
                     {item.label}
                  </button>
               ))}
            </nav>

            <div className="p-4 border-t border-slate-100">
               <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold">
                     CM
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-slate-900 truncate">Chukwuma Marcel</p>
                     <p className="text-xs text-slate-500 truncate">Admin</p>
                  </div>
               </div>
            </div>
         </aside>

         <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 z-30">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold">
                  T
               </div>
               <span className="text-lg font-bold text-slate-900">TinyInv</span>
            </div>

            <button onClick={() => appStore.setApp({ isModalOpen: true })} className="p-2 text-slate-600">
               {appStore.app.isModalOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
         </div>

         {appStore.app.isModalOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-20 pt-16 px-4">
               <nav className="py-4 space-y-2">
                  {navItems.map((item) => (
                     <button
                        key={item.id}
                        onClick={() => navigate(item.route)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                           location.pathname === item.route
                              ? 'bg-slate-900 text-white'
                              : 'text-slate-600 hover:bg-slate-50'
                        }`}
                     >
                        <item.icon size={20} />
                        {item.label}
                     </button>
                  ))}
               </nav>
            </div>
         )}
      </React.Fragment>
   );
};

const navItems: NavItem[] = [
   { label: 'Dashboard', icon: LayoutDashboard, id: 'dashboard', route: '/dashboard' },
   { label: 'Products', icon: Package, id: 'products', route: '/dashboard/products' },
   { label: 'Stores', icon: Store, id: 'stores', route: '/dashboard/stores' },
];

export default NavBar;
