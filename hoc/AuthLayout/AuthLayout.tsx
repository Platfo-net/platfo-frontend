import { NextPage } from "next";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
const AuthLayout: NextPage<Props> = ({ children, className }) => {
  return (
    <div className={`auth-layout ${className}`}>
      <div className="authBodyFrom m-auto">{children}</div>
    </div>
  );
};

export default AuthLayout;
