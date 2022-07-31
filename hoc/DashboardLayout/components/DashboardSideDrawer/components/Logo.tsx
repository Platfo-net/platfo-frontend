import Image from "next/image";
import Link from "next/link";
import React from "react";
import BotinowLogo from "../../../../../assets/svg/botinow-logo.svg";
// import BotinowLogo from "../../../../../assets/img/botinow_g.png";

const Logo = () => {
  return (
    <Link href="/">
      <span className="logo flex-col items-center justify-center  w-full ">
        <BotinowLogo />
        {/* <Image src={BotinowLogo} width={"50px"} height={50} /> */}
      </span>
    </Link>
  );
};

export default Logo;
