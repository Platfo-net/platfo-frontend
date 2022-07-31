import Home from "../../assets/svg/icons/home.svg";
import Connections from "../../assets/svg/icons/chart-connected.svg";
import Chatbot from "../../assets/svg/icons/comment-code.svg";
import LiveChat from "../../assets/svg/icons/comment.svg";
import Profile from "../../assets/svg/icons/portrait.svg";
import Signout from "../../assets/svg/icons/sign-out-alt.svg";

const ConnectionMenu = [
  {
    key: "add-account",
    path: "/dashboard/connections/accounts/add",
    type: "button",
  },
  {
    key: "accounts",
    path: "/dashboard/connections/accounts",
    type: "button",
  },
  {
    key: "new-connection",
    path: "/dashboard/connections/add",
    type: "button",
  },
  {
    key: "connections",
    path: "",
    type: "button",
    disabled: true,
  },
];

export default ConnectionMenu;
