import { NextPage, NextPageContext } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import Connectionbar from "containers/dashboard/connections/Connectionbar";
import useTranslation from "next-translate/useTranslation";
import { AxiosResponse } from "axios";
import $axios from "services/axios.config";
import SocialBox from "components/SocialBox/SocialBox";
import { useEffect } from "react";
import InstagramService from "services/endpoints/InstagramService";

const AccountsPage: NextPage = ({ accountResponse }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale } = router;

  console.log(accountResponse);
  const onClickAdd = () => {};

  const onClickAddAccount = () => {
    try {
      window.FB.login(
        async (response) => {
          if (response.authResponse) {
            console.log("Welcome!  Fetching your information.... ");
            console.log(response.authResponse);
            const data = {
              facebook_user_id: response.authResponse.userID,
              facebook_user_token: response.authResponse.accessToken,
            };
            await InstagramService.postConnectInstagram(data);
            FB.api("/me", function (response) {
              console.log("Good to see you, " + response.name + ".");
            });
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email,pages_show_list,pages_manage_metadata" }
      );
    } catch (e) {
      //TODO handle error
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res: AxiosResponse = await $axios.get(
          `user-services/api/v1/account`
        );
      } catch (e) {}
    })();
  }, []);

  return (
    <DashboardLayout>
      <Connectionbar />
      <div className="content basis-full ">
        {/* <h3 className="mb-5 mx-5">{t("accounts")}</h3> */}
        <div className="flex flex-wrap">
          <SocialBox empty onClick={onClickAddAccount} />
          {accountResponse && (
            <div className="basis-1/6">
              {/*  <SocialBox
            id="instagram"
            icon={<AiFillInstagram />}
            title={t("connect-to-instagram")}
            buttonText={t("connect")}
            onClick={onClickSocialBox}
          /> */}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let accountResponse = null;
  try {
    const res: AxiosResponse = await $axios.get(`user-services/api/v1/account`);
    accountResponse = res.data;
  } catch (err) {
    console.log(err);
    /*   const { res } = ctx;
    res.setHeader("location", "/404");
    res.statusCode = 307;
    res.end(); */
    return {};
  }
  return { props: { accountResponse } };
}

export default AccountsPage;
