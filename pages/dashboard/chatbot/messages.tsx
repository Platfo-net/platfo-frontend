import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import useTranslation from "next-translate/useTranslation";
import TopMenu from "components/TopMenu/TopMenu";
import ChatbotMenu from "assets/contents/chatbotMenu";
import ChatbotMessages from "containers/dashboard/chatbot/messages/ChatbotMessages";

const MessagesPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <DashboardLayout className="chatbot">
      <TopMenu items={ChatbotMenu} />
      <div className="content basis-full chatbot-messages">
        <ChatbotMessages />
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
