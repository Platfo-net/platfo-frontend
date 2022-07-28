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
      <div className="lg:basis-1/7 md:basis-1/6 sm:basis-1/3 ltr:mr-7 rtl:ml-7">
        <ConnectionSidebar />
      </div>
      <div className="grow mx-7"></div>
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
