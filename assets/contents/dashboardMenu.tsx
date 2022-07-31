import Home from "../../assets/svg/icons/home.svg";
import Connections from "../../assets/svg/icons/chart-connected.svg";
import Chatbot from "../../assets/svg/icons/comment-code.svg";
import LiveChat from "../../assets/svg/icons/comment.svg";
import Profile from "../../assets/svg/icons/portrait.svg";
import Signout from "../../assets/svg/icons/sign-out-alt.svg";

const DashboardMenu = {
  products: [
    {
      key: "home",
      path: "/dashboard",
      disabled: true,
      type: "link",
    },
    {
      key: "chatbot",
      path: "/dashboard/chatbot",
      type: "link",
    },
    {
      key: "liveChat",
      path: "/dashboard/liveChat",
      disabled: true,
      type: "link",
    },
  ],
  tools: [
    {
      key: "connections",
      path: "/dashboard/connections",
      type: "link",
    },
    {
      key: "profile",
      path: "/dashboard/profile",
      disabled: true,
      type: "link",
    },
    {
      key: "signout",
      type: "button",
    },
  ],
  Icons: {
    home: <Home />,
    homeSelected: <Home />,
    chatbot: <Chatbot />,
    chatbotSelected: <Chatbot />,
    profile: <Profile />,
    profileSelected: <Profile />,
    connections: <Connections />,
    connectionsSelected: <Connections />,
    liveChat: <LiveChat />,
    liveChatSelected: <LiveChat />,
    signout: <Signout />,
    signoutSelected: <Signout />,
  },
};

export default DashboardMenu;
