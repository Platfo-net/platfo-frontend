import Link from "next/link";
import React from "react";
import img from 'assets/img/platfo-logo-N.png'
import Image from 'next/image'


const Logo = ({href = "/"}) => {
  return (
    <Link href={href}>
      <span className="logo flex-col items-center justify-center  w-full ">
      <Image src={img.src} width={100} height={100} className="w-12 px-1 mx-1" />
      </span>
    </Link>
  );
};

export default Logo;
