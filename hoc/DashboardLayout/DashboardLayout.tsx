import { Fragment, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import DashboardSideDrawer from "./components/DashboardSideDrawer/DashboardSideDrawer";
import { useRouter } from "next/router";
import Head from "next/head";
import { tokenObj } from "helpers/token";
import { useSelector } from "react-redux";
import { AuthState } from "stores/reducers/authReducer";

interface Props {
  children: ReactNode;
  title?: string;
  subTitle?: string;
}

const DashboardLayout: NextPage<Props> = ({ title, subTitle, children }) => {
  const { language } = useSelector((state: AuthState) => ({
    language: state.auth.language,
  }));
  const [mobileNavsidebar, setMobileNavsidebar] = useState(false);

  const router = useRouter();

  const checkLogin = () => {
    const token = tokenObj.getAccessToken();
    if (!token) {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (router.locale === language) {
      const newLocale = language === "fa-IR" ? "en" : "fa-IR";
      router.push(router.pathname, router.pathname, { locale: newLocale });
    }
  }, [language]);

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Botinow</title>
        {/* TODO */}
        <meta name="description" content="Botinow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dashboard-layout flex min-h-screen relative">
        <DashboardSideDrawer mobileNavsidebar={mobileNavsidebar} />
        <div className="flex flex-1  flex-row my-7 ">{children}</div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
