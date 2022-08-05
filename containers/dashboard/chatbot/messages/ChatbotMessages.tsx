import MessageList from "./MessageList";
import UserInfo from "./UserInfo";
import UsersList from "./UsersList";

type ChatbotMessagesProps = {};

const ChatbotMessages: React.FC<ChatbotMessagesProps> = () => {
  return (
    <div className="flex flex-nowrap h-full">
      <div className="basis-1/4 m-4 overflow-y-auto">
        <UsersList />
      </div>
      <div className="basis-1/2 m-4 overflow-y-auto">
        <MessageList />
      </div>
      <div className="basis-1/4 m-4 overflow-y-auto">
        <UserInfo />
      </div>
    </div>
  );
};

export default ChatbotMessages;
