import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";
import ConnectionSidebar from "containers/dashboard/connections/ConnectionSidebar";
import SocialBox from "components/SocialBox/SocialBox";
import InstagramIcon from "../../../assets/img/instagram-icon.png";
import useTranslation from "next-translate/useTranslation";

const ConnectionsPage: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { locale } = router;

  const onChangeLanguage = useCallback(() => {
    const newLocale = router.locale === "fa-IR" ? "en" : "fa-IR";
    router.push(router.pathname, router.pathname, { locale: newLocale });
  }, [router]);

  return (
    <DashboardLayout onChangeLanguage={onChangeLanguage}>
      <div className="basis-1/5">
        <ConnectionSidebar />
      </div>
      <div className="grow mx-7"></div>
    </DashboardLayout>
  );
};

export default ConnectionsPage;
