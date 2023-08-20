import React from "react";
import AuthLayout from "../../components/AuthLayout/AuthLayout";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import FormTitle from "../../components/FormTitle/FormTitle";

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <FormTitle title="Register your account" />
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
