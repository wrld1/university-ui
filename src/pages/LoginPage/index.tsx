import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import LoginForm from "../../components/forms/LoginForm/LoginForm";
import FormTitle from "../../components/FormTitle/FormTitle";

const LoginPage: React.FC = () => {
  return (
    <AuthLayout>
      <FormTitle title="Welcome!" />
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
