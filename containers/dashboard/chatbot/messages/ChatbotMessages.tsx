import MessageList from "./MessageList";
import UserInfo from "./UserInfo";
import UsersList from "./UsersList";
import AccountsList from "./AccountsList";

type ChatbotMessagesProps = {};

const ChatbotMessages: React.FC<ChatbotMessagesProps> = () => {
  return (
    <div className="w-full m-auto">
      <div className="flex flex-nowrap message-container ltr:flex-row-reverse">
          <div className="w-3/12 mx-2 ">
              <UserInfo />
          </div>
        <div className="w-6/12 mx-2 ">
            <AccountsList />
          <MessageList />
        </div>
        <div className="w-3/12 mx-2 ">
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessages;
