import Link from "next/link";
import React from "react";
import BotinowLogo1 from "../../../../../assets/svg/botinow-logo1.svg";

const Logo = () => {
  return (
    <Link href="/">
      <span className="logo flex-col items-center justify-center  w-full ">
        <BotinowLogo1 />
      </span>
    </Link>
  );
};

export default Logo;
