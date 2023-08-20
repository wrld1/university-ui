import React from "react";
import AuthLayout from "../../AuthLayout/AuthLayout";
import RegisterForm from "../../forms/RegisterForm/RegisterForm";
import FormTitle from "../../FormTitle/FormTitle";

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <FormTitle title="Register your account" />
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
