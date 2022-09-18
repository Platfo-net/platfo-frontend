import {getFormattedDate, getFormattedTime} from "../../helpers/dateAndTimeHelper";
import {useState} from "react";

type MessageBoxProps = {
  className: string;
  data: any;
};

function checkImage(imageSrc, good, bad) {
  var img = new Image();
  img.onload = good
  img.onerror = bad
  img.src = imageSrc;
}


const MessageBox: React.FC<MessageBoxProps> = ({ data, className }) => {
  const [isImage, setIsImage] = useState(null);

  const getImage = () => {
    checkImage(data?.content?.url, () => setIsImage(data?.content?.url) , () => setIsImage(null))

  }



  if ( data?.content.widget_type === "TEXT") {
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
  if(data?.content?.widget_type === "STORY_MENTION") {
    setTimeout(() => {
      getImage()
    }, 5000);

     // console.log(isImage)
    return  <div
        className={`w-full flex flex-col h-min my-4 ${
            className.includes("user") ? "justify-end": "justify-start"
        }`}
    >
      <div className={`${className} message-box ${
          className.includes("user") ? "mr-auto": "ml-auto"
      }`}>
        {isImage ? <img src={data?.content?.url} alt="" /> : "No longer Availible"}
      </div>
      <div className={` message-date ${
          className.includes("user") ? "mr-auto": "ml-auto"
      }`}>
        {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
      </div>
    </div>
  }
  if(data?.content?.widget_type === "STORY_REPLY") {

      getImage()


    return  <div
        className={`w-full flex flex-col h-min my-4 ${
            className.includes("user") ? "justify-end": "justify-start"
        }`}
    >
      <div className={`${className} message-box ${
          className.includes("user") ? "mr-auto": "ml-auto"
      }`}>
        <div className="flex flex-col">
        <div className=" mb-3 border-y-0  border-indigo-200  border-solid rtl:pr-3 ltr:pl-3 rtl:border-l-0 ltr:border-r-0">
          <p className="text-sm text-gray-500"> Reply to: </p>
          {isImage ? <img src={data?.content?.url} alt="" /> : <p>No longer Availible</p>}
        </div>
          <div ><hr/></div>
         <p>{data?.content?.message}</p>
</div>
      </div>
      <div className={` message-date ${
          className.includes("user") ? "mr-auto": "ml-auto"
      }`}>
        {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
      </div>
    </div>
  }
  return "unknown";
};

export default MessageBox;
