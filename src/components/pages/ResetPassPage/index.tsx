import styles from "../../../styles/pages/authPage.module.scss";
import React, { useState } from "react";
import AuthLayout from "../../AuthLayout/AuthLayout";
import ResetPassForm from "../../forms/ResetPassForm/ResetPassForm";
import FormTitle from "../../FormTitle/FormTitle";
import { Link } from "react-router-dom";
import SubmitButton from "../../SubmitButton/SubmitButton";

const ResetPassPage: React.FC = () => {
  const [showForm, setShowForm] = useState(true);

  const handleShowForm = () => {
    setShowForm(false);
  };

  return (
    <AuthLayout>
      {showForm ? (
        <>
          <FormTitle title="Reset Your Password" />
          <ResetPassForm handleShowForm={handleShowForm} />
        </>
      ) : (
        <>
          <div className={styles["reset__page--container"]}>
            <FormTitle title="Password changed" />
            <p className={styles.subtitle}>
              You can use your new password to log into your account
            </p>
            <Link to="/sign-in">
              <SubmitButton buttonText="Log In" />
            </Link>
          </div>
          <Link className={styles.cancel__button} to="/sign-in">
            Go To Home
          </Link>
        </>
      )}
    </AuthLayout>
  );
};

export default ResetPassPage;
