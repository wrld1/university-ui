import React from "react";
import AuthLayout from "../../layouts/AuthLayout/AuthLayout";
import RegisterForm from "../../components/forms/RegisterForm/RegisterForm";
import FormTitle from "../../components/FormTitle/FormTitle";
import { getLectors } from "../../api/lectors.api";

const RegisterPage: React.FC = () => {
  const someFunc = async () => {
    const result = await getLectors();
    console.log(result.data);
  };

  someFunc();

  return (
    <AuthLayout>
      <FormTitle title="Register your account" />
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
