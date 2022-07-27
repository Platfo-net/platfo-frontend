import Link from "next/link";
import React from "react";
import BotinowLogo from "../../../../../assets/svg/botinow-logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <span className="logo inline-flex items-center justify-center  w-full ">
        <BotinowLogo />
        boti<b>Now</b>
      </span>
    </Link>
  );
};

export default Logo;
