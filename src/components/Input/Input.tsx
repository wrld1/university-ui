import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...inputProps }) => {
  return (
    <div className={styles.input__container}>
      <label className={styles.input__label}>{label}</label>
      <input className={styles.input__field} {...inputProps} />
    </div>
  );
};

export default Input;
