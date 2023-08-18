import React, { ReactNode } from "react";
import styles from "./AuthForm.module.scss";
import SubmitButton from "../SubmitButton/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import FormTitle from "../FormTitle/FormTitle";
import Input from "../Input/Input";
import Checkbox from "../Checkbox/Checkbox";

const AuthForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    // <div className={styles.input__form}>
    //
    //   {children}
    //   <div className={styles.show__password_container}>
    //     <input className={styles.show__password_button} type="checkbox" />
    //
    //   </div>
    //   <SubmitButton buttonText={buttonText} />
    // </div>
    <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title="Register your account" />
      <Input
        type="text"
        name="email"
        label="Email"
        errors={errors}
        register={register}
        validationSchema={{
          required: "Value is required",
          minLength: {
            value: 3,
            message: "Please enter a minimum of 3 characters",
          },
          type: "text",
        }}
        required
      />
      <Checkbox />
      <SubmitButton buttonText="Register" />
    </form>
  );
};

export default AuthForm;
