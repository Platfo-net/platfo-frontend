import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import Connectionbar from "containers/dashboard/connections/Connectionbar";
import SocialBox from "components/SocialBox/SocialBox";
import { AiFillInstagram } from "@react-icons/all-files/ai/AiFillInstagram";
import useTranslation from "next-translate/useTranslation";
import InstagramService from "services/endpoints/InstagramService";

const AddAccountPage: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();

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
    <DashboardLayout>
      <Connectionbar />
      <div className="content basis-full flex flex-1  flex-row ">
        <div className="basis-1/6">
          <SocialBox
            id="instagram"
            icon={<AiFillInstagram />}
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
