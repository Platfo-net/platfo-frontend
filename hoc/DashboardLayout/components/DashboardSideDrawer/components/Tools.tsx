import DashboardMenu from "assets/contents/dashboardMenu";
import { useRouter } from "next/router";
import React from "react";
import NavItem from "./NavItem";
import { useSelector } from "react-redux";
import { AuthState } from "stores/reducers/authReducer";
import { useDispatch } from "react-redux";
import { changeLanguage } from "stores/actions/authAction";

const Tools = () => {
  const { language } = useSelector((state: AuthState) => ({
    language: state.auth.language,
  }));
  const dispatch = useDispatch();
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
