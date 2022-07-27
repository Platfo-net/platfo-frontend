import React from "react";
import AuthLayout from "hoc/AuthLayout/AuthLayout";
import LandingLayout from "hoc/LandingLayout/LandingLayout";
import RegisterForm from "containers/Auth/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
