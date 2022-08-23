type MessageBoxProps = {
  className: string;
  data: any;
};

const MessageBox: React.FC<MessageBoxProps> = ({ data, className }) => {
  if (data?.content?.message) {
    return (
      <div
        className={`w-full flex  h-min my-4 ${
          className.includes("user") ? "justify-start" : "justify-end"
        }`}
      >
        <div className={`${className} message-box`}>{data.content.message}</div>
      </div>
    );
  }

  return <div></div>;
};

export default MessageBox;
