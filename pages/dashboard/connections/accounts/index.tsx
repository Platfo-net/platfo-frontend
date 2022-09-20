import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import SocialBox from "components/SocialBox/SocialBox";
import { useEffect } from "react";
import InstagramService from "services/endpoints/InstagramService";
import TopMenu from "components/TopMenu/TopMenu";
import ConnectionMenu from "assets/contents/connectionMenu";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getAccounts } from "stores/actions";
import AccountsService from "../../../../services/endpoints/AccountsService";
import {useState} from "react";
import BackdropLoading from "../../../../components/BackdropLoading"

const AccountsPage: NextPage = () => {
  const { accountList } = useAppSelector((state) => ({
    accountList: state.connections.accountList,
  }));
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const router = useRouter();

  const onClickAddAccount = () => {
    try {
      setLoading(true)
      window.FB.login(
        async (response) => {
          if (response.authResponse) {
            // console.log("Welcome!  Fetching your information.... ");
            // console.log(response.authResponse);
            const data = {
              facebook_user_id: response.authResponse.userID,
              facebook_user_token: response.authResponse.accessToken,
            };
            await InstagramService.postConnectInstagram(data);
            await dispatch(getAccounts());
            FB.api("/me", function (response) {
              console.log("Good to see you, " + response.name + ".");
            });
            setLoading(false)
          } else {
            console.log("User cancelled login or did not fully authorize.");
            setLoading(false)

          }
        },
        { scope: "public_profile,email,pages_show_list,pages_manage_metadata,pages_read_engagement,instagram_manage_messages,instagram_basic" }
      )
    } catch (e) {
      setLoading(false)
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

  const onDisconnect = async (item) => {
    try {
      await AccountsService.deleteAccount(item.id);
      await dispatch(getAccounts());
    } catch (e) {}
  };

  return (
    <DashboardLayout>
      {loading && <BackdropLoading/>}
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
                  removeable={true}
                  data={item}
                  imageUrlKey="profile_image"
                  titleKey="username"
                  buttonText={t("details")}
                  onClick={onClickConnect}
                  onClickRemove={onDisconnect}
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
