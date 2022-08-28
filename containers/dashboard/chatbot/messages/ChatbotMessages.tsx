import MessageList from "./MessageList";
import UserInfo from "./UserInfo";
import UsersList from "./UsersList";
import AccountsList from "./AccountsList";

type ChatbotMessagesProps = {};

const ChatbotMessages: React.FC<ChatbotMessagesProps> = () => {
  return (
    <div className="max-w-6xl m-auto">
        <AccountsList />
      <div className="flex flex-nowrap message-container">
        <div className="basis-3/4 mx-2 ">
          <MessageList />
        </div>
        <div className="basis-1/4 mx-2 ">
          <UserInfo />
          <UsersList />
        </div>
      </div>
    </div>
  );
};

export default ChatbotMessages;
