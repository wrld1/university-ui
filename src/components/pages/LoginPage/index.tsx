import React from "react";
import AuthLayout from "../../AuthLayout/AuthLayout";
import LoginForm from "../../forms/LoginForm/LoginForm";
import FormTitle from "../../FormTitle/FormTitle";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <FormTitle title="Welcome!" />
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
