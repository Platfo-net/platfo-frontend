import { NextPage, NextPageContext } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Connectionbar from "containers/dashboard/connections/Connectionbar";
import SocialBox from "components/SocialBox/SocialBox";
import InstagramIcon from "../../../assets/img/instagram-icon.png";
import useTranslation from "next-translate/useTranslation";
import { AxiosResponse } from "axios";
import $axios from "services/axios.config";

const ConnectionsPage: NextPage = ({ connectionResponse }) => {
  const { t } = useTranslation("common");

  console.log(connectionResponse);
  return (
    <DashboardLayout>
      <Connectionbar />
      <div className="content basis-full "></div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let connectionResponse = null;
  // try {
  /* const res: AxiosResponse = await $axios.get(
    `/connection/all?skip=0&limit=20`
  );
  connectionResponse = res.data; */
  /*  } catch (err) {
    console.log(err);
    const { res } = ctx;
    res.setHeader("location", "/404");
    res.statusCode = 307;
    res.end();
    return {};
  } */
  return { props: { connectionResponse } };
}

export default ConnectionsPage;
