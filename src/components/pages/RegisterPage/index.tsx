import React from "react";
import AuthLayout from "../../AuthLayout/AuthLayout";
import RegisterForm from "../../forms/RegisterForm/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
