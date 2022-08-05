type MessageBoxProps = {};

const MessageBox: React.FC<MessageBoxProps> = ({ text, className }) => {
  return (
    <div
      className={`w-full flex  h-min my-4 ${
        className.includes("user") ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`${className} message-box`}>{text}</div>
    </div>
  );
};

export default MessageBox;
