import React, { FC } from 'react';
import { Logo } from '@/components/dataDisplay/Logo';
import Link from 'next/link';
import { IMenu } from '@/types/global';
import MenuItem from '@/components/layouts/DashboardLayout/MenuItem/MenuItem';
import { sidebarMenu } from '@/constants/dashboardMenu';

const Sidebar: FC = () => {
  return (
    <aside className={`flex flex-col z-50`}>
      <div className="flex-grow flex flex-col justify-between">
        <Link href="/">
          <span className="block m-4">
            <Logo size={4} />
          </span>
        </Link>
        <nav className="flex flex-col ">
          {sidebarMenu.products.map((menuItem: IMenu) => {
            return <MenuItem key={menuItem.key} data={menuItem} />;
          })}
        </nav>
        <nav className="flex flex-col ">
          {sidebarMenu.tools.map((menuItem: IMenu) => {
            return <MenuItem key={menuItem.key} data={menuItem} />;
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
