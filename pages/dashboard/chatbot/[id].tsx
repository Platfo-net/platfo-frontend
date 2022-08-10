import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import ChatbotMenu from "assets/contents/chatbotMenu";
import TopMenu from "components/TopMenu/TopMenu";
import dynamic from "next/dynamic";
import { useAppSelector } from "hooks/reduxHooks";

const ChatbotDesignPage: NextPage = () => {
  const ChatFlowDesign = dynamic(
    () =>
      import("containers/dashboard/chatbot/chatflows/design/ChatFlowDesign"),
    {
      ssr: false,
    }
  );
  const { language } = useAppSelector((state) => ({
    language: state.auth.language,
  }));
  const router = useRouter();
  const { locale } = router;

  return (
    <DashboardLayout>
      <TopMenu items={ChatbotMenu} />
      <div className="chatflow-design content basis-full ">
        <ChatFlowDesign />
      </div>
    </DashboardLayout>
  );
};

export default ChatbotDesignPage;
