import {getFormattedDate, getFormattedTime} from "../../helpers/dateAndTimeHelper";

type MessageBoxProps = {
  className: string;
  data: any;
};

const MessageBox: React.FC<MessageBoxProps> = ({ data, className }) => {
  if (data?.content?.widget_type === "MESSAGE" || data?.content.message) {
    return (
      <div
        className={`w-full flex flex-col h-min my-4 ${
          className.includes("user") ? "justify-end": "justify-start"
        }`}
      >
        <div className={`${className} message-box ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
          {data.content.message}
        </div>
        <div className={` message-date ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
          {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
        </div>
      </div>
    );
  }

  if(data?.content?.widget_type === "MENU") {
    return (
        <div
            className={`widget-menu w-full flex flex-col h-min my-4 ${
                className.includes("user") ? "justify-end": "justify-start"
            }`}
        >
          <div className={`${className} message-box ${
              className.includes("user") ? "mr-auto": "ml-auto"
          }`}>
            <div className="title">
              {data.content.title}
            </div>
            <div className="choices">
              {data.content.choices.map(item => {
                return <button key={item.id} className="primary my-2 w-full"> {item.text} </button>
              })}
            </div>
          </div>
          <div className={` message-date ${
              className.includes("user") ? "mr-auto": "ml-auto"
          }`}>
            {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
          </div>
        </div>
    );
  }

  return <div/>;
};

export default MessageBox;
