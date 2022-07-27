import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import ConnectionSidebar from "containers/dashboard/connections/ConnectionSidebar";
import SocialBox from "components/SocialBox/SocialBox";
import InstagramIcon from "../../../../assets/img/instagram-icon.png";
import useTranslation from "next-translate/useTranslation";
import InstagramService from "services/endpoints/InstagramService";

const AddAccountPage: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  // const { data: session } = useSession();

  /* useEffect(() => {
    if (session) {
      console.log(session);
    }
  }, [session]); */

  const onChangeLanguage = useCallback(() => {
    const newLocale = router.locale === "fa-IR" ? "en" : "fa-IR";
    router.push(router.pathname, router.pathname, { locale: newLocale });
  }, [router]);

  const onClickSocialBox = (id) => {
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
  };

  return (
    <DashboardLayout onChangeLanguage={onChangeLanguage}>
      <div className="basis-1/5">
        <ConnectionSidebar />
      </div>
      <div className="grow mx-7">
        <div className="grid grid-cols-4 gap-12 ">
          <SocialBox
            id="facebook"
            imageUrl={InstagramIcon}
            title={t("connect-to-instagram")}
            buttonText={t("connect")}
            onClick={onClickSocialBox}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddAccountPage;
