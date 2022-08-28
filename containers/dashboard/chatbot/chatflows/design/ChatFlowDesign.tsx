import PopupMenu from "./components/nodes/components/PopupMenu";
import {ChatFlowProvider} from "./store/chatflow-context";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";

type ChatFlowDesignProps = {};

const ChatFlowDesign: React.FC<ChatFlowDesignProps> = () => {
  return (
    <ChatFlowProvider>
      <CanvasComponent />
      <PopupMenu/>
    </ChatFlowProvider>
  );
};

export default ChatFlowDesign;
