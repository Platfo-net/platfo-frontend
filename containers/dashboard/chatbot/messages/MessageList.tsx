import MessageBox from "components/MessageBox/MessageBox";
import {  useAppSelector } from "hooks/reduxHooks";
import { useEffect, useState } from "react";
import MessagesService from "services/endpoints/MessagesService";


type MessageListProps = {};

const MessageList: React.FC<MessageListProps> = () => {
  const { selectedAccount, selectedUser } = useAppSelector(
    (state) => ({
      selectedAccount: state.message.selectedAccount,
      selectedUser: state.message.selectedUser,
    })
  );
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        setMessages([]);
      }
    })();
  }, [selectedAccount]);

  useEffect(() => {
    (async () => {
      if (selectedUser) {
        try {
          const response = await MessagesService.getArchive(
            null,
            selectedUser.user_page_id,
            selectedUser.contact_igs_id
          );
          setMessages(response.data);
        } catch (e) {}
      }
    })();
  }, [selectedUser]);

  useEffect(() => {
    if(messages.length > 0) {
      let objDiv = document.getElementById("message-list");
      objDiv.scrollTop = objDiv.scrollHeight;
    }

  }, [messages]);


  return (
    <div className="message-container flex flex-col h-full">
      {messages.length > 0 && (
        <div id="message-list" className="w-full flex flex-col card h-full  overflow-y-auto">
          {messages.reverse()?.map((item) => {
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
    </div>
  );
};

export default MessageList;
