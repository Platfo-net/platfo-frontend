import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import TopMenu from "components/TopMenu/TopMenu";
import ChatbotMenu from "assets/contents/chatbotMenu";
import ChatbotMessages from "containers/dashboard/chatbot/messages/ChatbotMessages";
import {useEffect} from "react";
import {getAccounts, selectAccount} from "../../../stores/actions";
import {useAppDispatch} from "../../../hooks/reduxHooks";

const MessagesPage: NextPage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            try {
                 const response = await dispatch(getAccounts());
                 if(response.length > 0 ) {
                     dispatch(selectAccount(response[0]));
                 }
            } catch (e) {}
        })();
    }, []);
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
