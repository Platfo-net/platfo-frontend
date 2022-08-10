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
import TopMenu from "components/TopMenu/TopMenu";
import ConnectionMenu from "assets/contents/connectionMenu";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getAccounts } from "stores/actions";

const AccountsPage: NextPage = () => {
  const { accountList } = useAppSelector((state) => ({
    accountList: state.connections.accountList,
  }));
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const router = useRouter();

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
            await dispatch(getAccounts());
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
        await dispatch(getAccounts());
      } catch (e) {}
    })();
  }, []);

  const onClickConnect = (item) => {
    router.push(
      "/dashboard/connections/accounts/[id]",
      `/dashboard/connections/accounts/${item.id}`
    );
  };

  return (
    <DashboardLayout>
      <TopMenu items={ConnectionMenu} />
      <div className="content basis-full ">
        <div className="flex flex-wrap">
          <SocialBox
            empty
            onClick={onClickAddAccount}
            title={t("add-new-account")}
          />
          {accountList?.map((item) => {
            return (
              <div className="basis-1/6" key={item.id}>
                <SocialBox
                  data={item}
                  imageUrlKey="profile_image_url"
                  titleKey="username"
                  buttonText={t("details")}
                  onClick={onClickConnect}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AccountsPage;
