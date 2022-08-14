import { Fragment, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import DashboardSideDrawer from "./components/DashboardSideDrawer/DashboardSideDrawer";
import { useRouter } from "next/router";
import Head from "next/head";
import { tokenObj } from "helpers/token";
import { useAppSelector } from "hooks/reduxHooks";

interface Props {
  children: ReactNode;
  title?: string;
  subTitle?: string;
}

const DashboardLayout: NextPage<Props> = ({ title, subTitle, children }) => {
  const { language } = useAppSelector((state) => ({
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
        <div className="flex flex-col w-full bg-white">{children}</div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
