import MessageBox from "components/MessageBox/MessageBox";
import { useAppSelector } from "hooks/reduxHooks";
import { useEffect, useState } from "react";
import MessagesService from "services/endpoints/MessagesService";
import Input from "../../../../components/Input/Input";
import useTranslation from "next-translate/useTranslation";
import { useForm } from "react-hook-form";
import SendIcon from "../../../../assets/svg/icons/paper-plane.svg";
import ChatbotIcon from "../../../../assets/svg/icons/comment-code.svg";
import UserIcon from "../../../../assets/svg/icons/portrait.svg";
import ConnectionService from "../../../../services/endpoints/ConnectionService";

type MessageListProps = {};

type FormData = {
  text: "string";
};

const MessageList: React.FC<MessageListProps> = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { t } = useTranslation("common");
  const { selectedAccount, selectedUser } = useAppSelector((state) => ({
    selectedAccount: state.message.selectedAccount,
    selectedUser: state.message.selectedUser,
  }));
  const [messages, setMessages] = useState([]);
  const [state, setState] = useState("enable");
  const [timeInterval, setTimeInterval] = useState(0);

  setTimeout(() => {
    setTimeInterval(timeInterval + 1);
  }, 2000);

  const onSubmit = async (values) => {
    try {
      const data = {
        ...values,
      };
      await MessagesService.postMessage(
        selectedUser.user_page_id,
        selectedUser.contact_igs_id,
        data
      );
      onClear();
    } catch (e) {}
  };

  const onClear = () => {
    reset({
      text: "",
    });
  };

  const onClickStatus = async () => {
    try {
      const status = state === "enable" ? "disable" : "enable";
      const response = await ConnectionService.putStateChatflow(
        status,
        selectedUser.user_page_id,
          null
      );
      setState(status);
    } catch (e) {}
  };

  const getMessagesData = async () => {
    try {
      const response = await MessagesService.getArchive(
        null,
        selectedUser.user_page_id,
        selectedUser.contact_igs_id
      );
      setMessages(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        setMessages([]);
      }
    })();
  }, [selectedAccount]);

  useEffect(() => {
    if (selectedUser) {
      getMessagesData();
    }
  }, [timeInterval]);

  useEffect(() => {
    if (messages.length > 0) {
      let objDiv = document.getElementById("message-list");
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      if (selectedUser) {
        try {
          const status = "enable";
          const response = await ConnectionService.putStateChatflow(
            status,
            selectedUser.user_page_id,
              null
          );
          setState(status);
        } catch (e) {}
      }
    })();
  }, [selectedUser]);

  return (
    <div className="message-container flex flex-col h-full">
      {messages.length > 0 && (
        <div
          id="message-list"
          className="w-full flex flex-col card h-full  overflow-y-auto"
        >
          {messages?.map((item) => {
            return (
              <MessageBox
                key={item.id}
                className={`${
                  selectedUser.user_page_id === item.from_page_id
                    ? "bot"
                    : "user"
                }`}
                data={item}
              />
            );
          })}
        </div>
      )}
      <div className="pt-2">
        <form
          className="w-full flex flex-wrap my-3 card"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex w-full px-2">
            <Input label={t("connection-name")} {...register("text")} />
            <button
              type="submit"
              className=" secondary mt-auto icon-only mb-3 mx-2"
            >
              <SendIcon />
            </button>
            <button
              type="button"
              className={`${
                state === "enable" ? "danger" : "chatbot"
              }  mt-auto icon-only mb-3`}
              onClick={onClickStatus}
            >
              {state === "enable" ? <UserIcon /> : <ChatbotIcon />}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default MessageList;
