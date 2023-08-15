import React, { ReactNode } from "react";
import styles from "./InputForm.module.scss";
import SubmitButton from "../SubmitButton/SubmitButton";

interface InputFormProps {
  children: ReactNode;
  title: string;
  buttonText: string;
}

const InputForm: React.FC<InputFormProps> = ({
  title,
  children,
  buttonText,
}) => {
  return (
    <div className={styles.input__form}>
      <div className={styles.form__title}>{title}</div>
      {children}
      <div className={styles.show__password_container}>
        <input className={styles.show__password_button} type="checkbox" />
        <p className={styles.show__password_text}>Show Password</p>
      </div>
      <SubmitButton buttonText={buttonText} />
    </div>
  );
};

export default InputForm;
