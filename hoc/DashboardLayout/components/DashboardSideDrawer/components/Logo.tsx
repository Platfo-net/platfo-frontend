import Link from "next/link";
import React from "react";
import BotinowLogo from "../../../../../assets/svg/botinow-logo.svg";

const Logo = () => {
  return (
    <Link href="/">
      <span className="logo flex-col items-center justify-center  w-full ltr:pl-0 ltr:pr-2 rtl:pr-0 rtl:pl-2 pt-2">
        <BotinowLogo />
        <p>
          boti<b>Now</b>
        </p>
      </span>
    </Link>
  );
};

export default Logo;
