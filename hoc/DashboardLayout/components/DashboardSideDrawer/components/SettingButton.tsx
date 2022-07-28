import DashboardMenu from "assets/contents/dashboardMenu";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { IMenu } from "types/types";
import NavItem from "./NavItem";
import { TranslateIcon } from "@heroicons/react/outline";
import { useSelector } from "react-redux";
import { AuthState } from "stores/reducers/authReducer";
import { useDispatch } from "react-redux";
import { changeLanguage } from "stores/actions/authAction";

const SettingButton = () => {
  const { language } = useSelector((state: AuthState) => ({
    language: state.auth.language,
  }));
  const dispatch = useDispatch();

  const onChangeLanguage = () => {
    const newLocale = language === "fa-IR" ? "en" : "fa-IR";
    dispatch(changeLanguage(newLocale));
  };
  return (
    <div className="flex flex-col  ">
      {DashboardMenu.tools.map((item: IMenu) => {
        return <NavItem key={item.key} name={item.key} hrefLink={item.path} />;
      })}
      <button
        className="m-1 outline-none border-none py-2 bg-transparent text-white opacity-50"
        onClick={onChangeLanguage}
      >
        <TranslateIcon className="w-5" />
      </button>
    </div>
  );
};

export default SettingButton;
