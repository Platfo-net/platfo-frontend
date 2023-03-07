import Link from "next/link";
import React from "react";
import PlatfoLogo1 from "../../../../../assets/svg/platfo-logo1.svg";

const Logo = ({href = "/"}) => {
  return (
    <Link href={href}>
      <span className="logo flex-col items-center justify-center  w-full ">
        <PlatfoLogo1 />
      </span>
    </Link>
  );
};

export default Logo;
