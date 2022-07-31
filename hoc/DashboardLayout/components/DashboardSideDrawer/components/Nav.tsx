import DashboardMenu from "assets/contents/dashboardMenu";
import React, { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { IMenu } from "types/types";
import NavItem from "./NavItem";

const Nav = () => {
  return (
    <>
      <nav className="flex flex-col ">
        {DashboardMenu.products.map((item: IMenu) => {
          return (
            <NavItem key={item.key} item={item} icons={DashboardMenu.Icons} />
          );
        })}
      </nav>
    </>
  );
};

export default Nav;
