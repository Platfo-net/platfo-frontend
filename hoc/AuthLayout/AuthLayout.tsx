import { NextPage } from 'next';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import img from 'assets/img/platfo-logo-N.png'
import Image from 'next/image'

interface Props {
  children: ReactNode;
  className?: string;
}
const AuthLayout: NextPage<Props> = ({ children, className }) => {
  return (
    <div className={`auth-layout ${className}`}>
      <div className="authBodyFrom m-auto">
        <Link href="/">
          <span className="logo flex-col items-center justify-center w-32 mx-auto mt-8">
            <Image src={img.src} width={100} height={100} className="w-12 px-1 mx-1" />
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
