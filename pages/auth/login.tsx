import React from "react";
import AuthLayout from "hoc/AuthLayout/AuthLayout";
import SigninForm from "containers/Auth/SigninForm/SigninForm";

const login = () => {
    console.log(process.env.BASE_URL)
  return (
    <AuthLayout className="">
      <SigninForm />
    </AuthLayout>
  );
};

export default login;
