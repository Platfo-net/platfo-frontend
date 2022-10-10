import {getFormattedDate, getFormattedTime} from "../../helpers/dateAndTimeHelper";
import {useState, useEffect} from "react";
import Modal from "../../components/Modal/Modal"
import  NextImage from 'next/image';
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

function getMediaType(url) {
    return fetch(url, { headers: {  Accept: '*/*' }  }).then(res => {
        return res.headers.get('Content-Type')
    }).catch(e => {
        fetch(url, {mode: 'no-cors' }).then(res => {
            return 'image/jpeg'
        })
    })
}

const MessageBox: React.FC<MessageBoxProps> = ({ data, className }) => {
  const [isImage, setIsImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState({type: "", url: ""});


  const onShowStory = async (url) => {
      try {
          setShowModal(true);
          const mediaType = await getMediaType(url);
          let data = {
              type:"",
              url:url
          }
          if(mediaType?.startsWith('video')) {
              data.type = 'video';
          } else {
              const uniqUrl = url + "#" + Date.now() + Math.random();
              data.type = 'image';
              data.url = uniqUrl;
          }
              setSelectedUrl(data)
      } catch (e) {}
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
  if ( data?.content.widget_type === "VIDEO") {
    return (
      <div
        className={`w-full flex flex-col h-min my-4 ${
          className.includes("user") ? "justify-end": "justify-start"
        }`}
      >
        <div className={`${className} message-box ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
            <video controls src={data?.content.url} style={{ width: "200px" }} />
        </div>
        <div className={` message-date ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
          {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
        </div>
      </div>
    );
  }
  if ( data?.content.widget_type === "IMAGE") {
    return (
      <div
        className={`w-full flex flex-col h-min my-4 ${
          className.includes("user") ? "justify-end": "justify-start"
        }`}
      >
        <div className={`${className} message-box ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
            <img src={data?.content.url} alt="No longer Availible" />
        </div>
        <div className={` message-date ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
          {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
        </div>
      </div>
    );
  }
  if ( data?.content.widget_type === "AUDIO") {
    return (
      <div
        className={`w-full flex flex-col h-min my-4 ${
          className.includes("user") ? "justify-end": "justify-start"
        }`}
      >
        <div className={`${className} message-box ${
            className.includes("user") ? "mr-auto": "ml-auto"
        }`}>
            <audio controls >
                <source src={data?.content.url}/>

                        Your browser does not support the audio element.
            </audio>
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
    return  <div
        className={`w-full flex flex-col h-min my-4 ${
            className.includes("user") ? "justify-end": "justify-start"
        }`}
    >
      <div className={`${className} message-box ${
          className.includes("user") ? "mr-auto": "ml-auto"
      }`}>

          <button onClick={() => onShowStory(data?.content?.url)} className="primary" >Show</button>

          <Modal open={showModal} onCancel={() => setShowModal(false)}>
              {selectedUrl.type !== "" && <>
                  {selectedUrl.type === 'video' ?  <video controls src={selectedUrl.url} style={{ width: "200px" }} /> :
                      <img src={selectedUrl.url } alt="No longer Availible" width={200} height={355}/>}
              </> }

          </Modal>
      </div>
      <div className={` message-date ${
          className.includes("user") ? "mr-auto": "ml-auto"
      }`}>
        {getFormattedTime(data.send_at)} - {getFormattedDate(data.send_at)}
      </div>
    </div>
  }
  if(data?.content?.widget_type === "STORY_REPLY") {
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
            <button onClick={() => onShowStory(data?.content?.url)} className="primary" >Show</button>
            <Modal open={showModal} onCancel={() => setShowModal(false)}>
                {selectedUrl.type === 'video' ?  <video controls src={selectedUrl.url} style={{ width: "200px" }} /> :
                    <img src={selectedUrl.url} alt="No longer Availible" width={200} height={355}/>}
            </Modal>
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
