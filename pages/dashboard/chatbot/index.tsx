import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import ChatbotMenu from "assets/contents/chatbotMenu";
import TopMenu from "components/TopMenu/TopMenu";
import { useAppSelector } from "hooks/reduxHooks";
import Link from "next/link";

const ChatbotPage: NextPage = () => {
  const { language } = useAppSelector((state) => ({
    language: state.auth.language,
  }));
  const router = useRouter();
  const { locale } = router;

  const onClickFlow = () => {
    router.push("/dashboard/chatbot/[id]", "/dashboard/chatbot/1");
  };

  return (
    <DashboardLayout className="chatbot">
      <TopMenu items={ChatbotMenu} />
      <div className="content basis-full ">
        <button onClick={onClickFlow}> f </button>
      </div>
    </DashboardLayout>
  );
};

export default ChatbotPage;
