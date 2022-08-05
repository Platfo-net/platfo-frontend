import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { AuthState } from "stores/reducers/authReducer";
import { useSelector } from "react-redux";
import ChatbotMenu from "assets/contents/chatbotMenu";
import TopMenu from "components/TopMenu/TopMenu";

const ChatbotPage: NextPage = () => {
  const { language } = useSelector((state: AuthState) => ({
    language: state.auth.language,
  }));
  const router = useRouter();
  const { locale } = router;

  return (
    <DashboardLayout>
      <TopMenu items={ChatbotMenu} />
      <div className="content basis-full "></div>
    </DashboardLayout>
  );
};

export default ChatbotPage;
