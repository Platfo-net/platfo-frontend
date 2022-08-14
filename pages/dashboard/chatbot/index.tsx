import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import ChatbotMenu from "assets/contents/chatbotMenu";
import TopMenu from "components/TopMenu/TopMenu";
import { useAppSelector } from "hooks/reduxHooks";

const ChatbotPage: NextPage = () => {
  const { language } = useAppSelector((state) => ({
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
