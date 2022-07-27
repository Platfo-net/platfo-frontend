import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";

const Dashboard: NextPage = () => {
  const router = useRouter();

  const onChangeLanguage = useCallback(() => {
    const newLocale = router.locale === "fa-IR" ? "en" : "fa-IR";
    if (newLocale === "fa-IR") {
      document.querySelector("body").style.direction = "rtl";
    } else {
      document.querySelector("body").style.direction = "ltr";
    }
    router.push(router.pathname, router.pathname, { locale: newLocale });
  }, [router]);

  return (
    <DashboardLayout onChangeLanguage={onChangeLanguage}>
      <div> hi</div>
    </DashboardLayout>
  );
};

export default Dashboard;
