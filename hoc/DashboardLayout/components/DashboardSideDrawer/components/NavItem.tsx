import Link from "next/link";
import React, { ReactElement } from "react";
import ChatBotIcon from "../../../../../assets/svg/chatbot.svg";
import ChatBotSelectedIcon from "../../../../../assets/svg/chatbot-selected.svg";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { UserIcon, LightningBoltIcon } from "@heroicons/react/outline";
import { BsPlug } from "@react-icons/all-files/bs/BsPlug";
import { BsFillPersonFill } from "@react-icons/all-files/bs/BsFillPersonFill";
import { useSelector } from "react-redux";
import { AuthState } from "stores/reducers/authReducer";

const NavItem = ({ name, hrefLink }) => {
  const { language } = useSelector((state: AuthState) => ({
    language: state.auth.language,
  }));
  const router = useRouter();
  let { t } = useTranslation("common");

  const Icons: { [x: string]: ReactElement } = {
    chatbot: <ChatBotIcon />,
    chatbotSelected: <ChatBotSelectedIcon />,
    user: <BsFillPersonFill />,
    userSelected: <BsFillPersonFill />,
    connections: <BsPlug className="fill-white " />,
    connectionsSelected: <BsPlug />,
  };

  return (
    <>
      <Link href={hrefLink}>
        <span
          className={`${
            router.pathname.includes(hrefLink) ? "active" : ""
          } menuItem${
            language === "en" ? "-rtl" : "-ltr"
          } inline-flex items-center justify-center  cursor-pointer relative group ltr:pr-2   my-2 rtl:pl-2`}
        >
          <b></b>
          <b></b>
          <span className="icon block group-hover:hidden">{Icons[name]}</span>
          <span className="icon-active hidden group-hover:block">
            <span />
            {Icons[name + "Selected"]}
          </span>
        </span>
      </Link>
    </>
  );
};

export default NavItem;
