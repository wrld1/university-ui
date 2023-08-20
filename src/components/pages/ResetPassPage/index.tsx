import React from "react";
import AuthLayout from "../../AuthLayout/AuthLayout";
import ResetPassForm from "../../forms/ResetPassForm/ResetPassForm";
import FormTitle from "../../FormTitle/FormTitle";

const ResetPassPage: React.FC = () => {
  return (
    <AuthLayout>
      <FormTitle title="Reset Your Password" />
      <ResetPassForm />
    </AuthLayout>
  );
};

export default ResetPassPage;
