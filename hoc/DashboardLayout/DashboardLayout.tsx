import { Fragment, ReactNode, useEffect, useState } from "react";
import { NextPage } from "next";
import DashboardSideDrawer from "./components/DashboardSideDrawer/DashboardSideDrawer";
import { useRouter } from "next/router";
import Head from "next/head";
import { tokenObj } from "helpers/token";

interface Props {
  children: ReactNode;
  title?: string;
  subTitle?: string;
}

const DashboardLayout: NextPage<Props> = ({
  title,
  subTitle,
  children,
  onChangeLanguage,
}) => {
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
        <DashboardSideDrawer
          mobileNavsidebar={mobileNavsidebar}
          onChangeLanguage={onChangeLanguage}
        />
        <div className="flex flex-1  flex-row my-7 ">{children}</div>
      </div>
    </Fragment>
  );
};

export default DashboardLayout;
