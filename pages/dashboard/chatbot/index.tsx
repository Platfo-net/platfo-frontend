import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import ChatbotMenu from "assets/contents/chatbotMenu";
import TopMenu from "components/TopMenu/TopMenu";
import SocialBox from "../../../components/SocialBox/SocialBox";
import {useEffect, useRef, useState} from "react";
import chatflowService from "../../../services/endpoints/ChatflowService";
import useTranslation from "next-translate/useTranslation";
import {getFormattedDate, getFormattedTime} from "../../../helpers/dateAndTimeHelper";
import ChatflowService from "../../../services/endpoints/ChatflowService";
import Modal from "../../../components/Modal/Modal";
import AddNewChatflowForm from "../../../containers/dashboard/chatbot/AddNewChatflowForm";

const ChatbotPage: NextPage = () => {
  const [chatflowList, setChatflowList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation("common");
  const submitRef = useRef();

  const router = useRouter();

  const onClickRemove = async (value) => {
    try{
       await ChatflowService.deleteChatflow(value.id);
      await getChatFlowList()
    }catch (e) {

    }

  };
  const onClickChatflow = (chatflowData) => {
    console.log(chatflowData)
    router.push("/dashboard/chatbot/[id]", `/dashboard/chatbot/${chatflowData.id}`);
  };

  const getChatFlowList = async  () => {
    try {
      const response = await chatflowService.getUserChatflows(null);
      const newList = response.data.map((item) => ({
        ...item,
        date:
            getFormattedTime(item.updated_at) +
            " - " +
            getFormattedDate(item.updated_at),
      }));
      setChatflowList(newList);
    } catch (e) {}
  }

  useEffect(() => {
    (async () => {
      await getChatFlowList()
    })();
  }, []);

  const modalHandler = () => {
    setOpenModal(!openModal);
  };

  const onSubmit = () => {
    submitRef.current.click();
  };

  const onSuccess = (chatflowId) => {
    router.push("/dashboard/chatbot/[id]", `/dashboard/chatbot/${chatflowId}`);
    modalHandler()
  }

  return (
    <DashboardLayout className="chatbot">
      <TopMenu items={ChatbotMenu} />
      <div className="content basis-full ">
        <div className="flex flex-wrap">
          <SocialBox
            className="chatbot"
            empty
            onClick={modalHandler}
            title={t("add-new-chatflow")}
          />
          {chatflowList?.map((item) => {
            return (
              <div className="basis-1/6" key={item.id}>
                <SocialBox
                  className="chatbot"
                  removeable={true}
                  data={item}
                  iconKey={"BOT_BUILDER"}
                  titleKey="name"
                  descriptionKey="date"
                  buttonText={t("details")}
                  onClick={onClickChatflow}
                  onClickRemove={onClickRemove}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
          open={openModal}
          onCancel={modalHandler}
          title={ t("add-new-chatflow")}
          size="md"
          onSubmit={onSubmit}
      >
        <AddNewChatflowForm
            submitRef={submitRef}
            onSuccess={onSuccess}
            status={openModal}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default ChatbotPage;
