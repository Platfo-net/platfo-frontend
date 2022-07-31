import { NextPage, NextPageContext } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import ConnectionSidebar from "containers/dashboard/connections/ConnectionSidebar";
import useTranslation from "next-translate/useTranslation";
import { AxiosResponse } from "axios";
import $axios from "services/axios.config";

const AccountsPage: NextPage = ({ accountResponse }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale } = router;

  console.log(accountResponse);
  return (
    <DashboardLayout>
      <ConnectionSidebar />
      <div className="content basis-full "></div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let accountResponse = null;
  try {
    const res: AxiosResponse = await $axios.get(`/account`);
    accountResponse = res.data;
  } catch (err) {
    console.log(err);
    const { res } = ctx;
    res.setHeader("location", "/404");
    res.statusCode = 307;
    res.end();
    return {};
  }
  return { props: { accountResponse } };
}

export default AccountsPage;
