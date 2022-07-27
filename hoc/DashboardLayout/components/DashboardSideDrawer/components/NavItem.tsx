import Link from "next/link";
import React, { ReactElement } from "react";
import ChatBotIcon from "../../../../../assets/svg/chatbot.svg";
import ChatBotSelectedIcon from "../../../../../assets/svg/chatbot-selected.svg";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { UserIcon, LightningBoltIcon } from "@heroicons/react/outline";
import { FaBeer } from "@react-icons/all-files/fa/FaBeer";

const NavItem = ({ name, hrefLink }) => {
  const router = useRouter();
  let { t } = useTranslation("common");

  const Icons: { [x: string]: ReactElement } = {
    chatbot: <ChatBotIcon />,
    chatbotSelected: <ChatBotSelectedIcon />,
    user: <UserIcon />,
    userSelected: <UserIcon />,
    connections: <LightningBoltIcon className="fill-white " />,
    connectionsSelected: <LightningBoltIcon />,
  };

  return (
    <>
      <Link href={hrefLink}>
        <span
          className={`${
            router.pathname == hrefLink ? "active" : ""
          } menuItem inline-flex items-center justify-center py-5 px-7 cursor-pointer relative group ltr:ml-1 rtl:mr-1 my-2`}
        >
          <span className="icon block group-hover:hidden"> {Icons[name]}</span>
          <span className="icon-active hidden group-hover:block">
            <span />
            {Icons[name + "Selected"]}
          </span>
          <span
            className={`title hidden group-hover:block absolute left-0 right-0 -bottom-2 text-center p-1 text-xs`}
          >
            {t(name)}
          </span>
        </span>
      </Link>
    </>
  );
};

export default NavItem;
