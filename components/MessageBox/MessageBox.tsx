import {getFormattedDate, getFormattedTime} from "../../helpers/dateAndTimeHelper";

type MessageBoxProps = {
  className: string;
  data: any;
};

const MessageBox: React.FC<MessageBoxProps> = ({ data, className }) => {
  if (data?.content?.message) {
    return (
      <div
        className={`w-full flex flex-col h-min my-4 ${
          className.includes("user") ? "justify-end": "justify-start"
        }`}
      >
        <div className={`${className} message-box ${
            className.includes("user") ? "mr-auto": ""
        }`}>
          {data.content.message}
        </div>
        <div className={` message-date ${
            className.includes("user") ? "mr-auto": ""
        }`}>
          {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
        </div>
      </div>
    );
  }

  return <div/>;
};

export default MessageBox;
