import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";

const ChatbotPage: NextPage = () => {
  const router = useRouter();
  const { locale } = router;

  const onChangeLanguage = useCallback(() => {
    const newLocale = router.locale === "fa-IR" ? "en" : "fa-IR";
    router.push(router.pathname, router.pathname, { locale: newLocale });
  }, [router]);

  return (
    <DashboardLayout onChangeLanguage={onChangeLanguage}>
      <div> hi</div>
    </DashboardLayout>
  );
};

export default ChatbotPage;
