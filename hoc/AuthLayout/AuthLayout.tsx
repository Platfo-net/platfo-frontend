import { NextPage } from 'next';
import React, { ReactNode } from 'react';
import Link from 'next/link';
import PlatfoLogo1 from '../../assets/svg/platfo-logo1.svg';
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
            <PlatfoLogo1 />
          </span>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
