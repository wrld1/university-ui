import React from "react";
import AuthLayout from "../../AuthLayout/AuthLayout";
import LoginForm from "../../forms/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
