import Avatar from "components/Avatar/Avatar";
import MessageBox from "components/MessageBox/MessageBox";
import Img from "../../../../assets/img/p.png";

type MessageListProps = {};

const MessageList: React.FC<MessageListProps> = () => {
  return (
    <div className="flex flex-col h-full">
      <div className="w-full flex flex-wrap">
        <div className="basis-1/6 px-2">
          <Avatar imageUrl={Img} className="" />
        </div>
        <div className="basis-1/6 px-2">
          <Avatar imageUrl={Img} className="active chatbot" />
        </div>
        <div className="basis-1/6 px-2">
          <Avatar imageUrl={Img} className="" />
        </div>
      </div>
      <div className="w-full flex flex-col card h-full mt-2">
        <MessageBox className="user w-1/2" text="سلام خوبی؟" />
        <MessageBox className="bot w-1/2" text="ممنون" />
      </div>
    </div>
  );
};

export default MessageList;
