import PopupMenu from "./components/nodes/components/PopupMenu";
import { ChatFlowProvider } from "./store/chatflow-context";
import CanvasComponent from "./components/CanvasComponent/CanvasComponent";
import InfoDrawer from "./components/InfoDrawer/InfoDrawer";

type ChatFlowDesignProps = {};

const ChatFlowDesign: React.FC<ChatFlowDesignProps> = () => {
  return (
    <ChatFlowProvider>
      <CanvasComponent />
      <PopupMenu />
      <InfoDrawer />
    </ChatFlowProvider>
  );
};

export default ChatFlowDesign;
