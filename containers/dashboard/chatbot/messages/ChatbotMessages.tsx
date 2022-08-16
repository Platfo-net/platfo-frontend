import MessageList from "./MessageList";
import UserInfo from "./UserInfo";
import UsersList from "./UsersList";

type ChatbotMessagesProps = {};

const ChatbotMessages: React.FC<ChatbotMessagesProps> = () => {
  return (
    <div className="flex flex-nowrap message-container">
      <div className="basis-1/4 mx-2 ">
        <UsersList />
      </div>
      <div className="basis-1/2 mx-2 ">
        <MessageList />
      </div>
      <div className="basis-1/4 mx-2 ">
        <UserInfo />
      </div>
    </div>
  );
};

export default ChatbotMessages;
