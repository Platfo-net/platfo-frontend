import DashboardMenu from "assets/contents/dashboardMenu";
import { useRouter } from "next/router";
import React from "react";
import NavItem from "./NavItem";
import { changeLanguage } from "stores/actions";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";

const Tools = () => {
  const { language } = useAppSelector((state) => ({
    language: state.auth.language,
  }));
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onChangeLanguage = () => {
    const newLocale = language === "fa-IR" ? "en" : "fa-IR";
    router.push(router.pathname, router.pathname, { locale: newLocale });
    dispatch(changeLanguage(newLocale));
  };
  return (
    <div className="flex flex-col mb-4 ">
      {DashboardMenu.tools.map((item) => {
        return (
          <NavItem key={item.key} item={item} icons={DashboardMenu.Icons} />
        );
      })}
      {/* <button
        className="m-1 outline-none border-none py-2 bg-transparent text-white opacity-50"
        onClick={onChangeLanguage}
      >
        <TranslateIcon className="w-5" />
      </button> */}
    </div>
  );
};

export default Tools;
