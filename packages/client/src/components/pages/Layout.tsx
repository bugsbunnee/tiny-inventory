import { Outlet } from 'react-router-dom';

import React from 'react';
import NavBar from '../common/NavBar';
import Header from '../common/Header';

const Layout: React.FC = () => {
   return (
      <div className="min-h-screen bg-muted/60 flex">
         <NavBar />

         <main className="flex-1 md:ml-64 w-full max-w-400 mx-auto">
            <Header />

            <Outlet />
         </main>
      </div>
   );
};

export default Layout;
