import React from "react";
import {
  UseFormRegister,
  DeepMap,
  FieldValues,
  FieldError,
} from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps<T extends FieldValues> {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  errors: DeepMap<T, FieldError>;
}

const Input: React.FC<InputProps<any>> = ({
  label,
  name,
  type,
  placeholder,
  register,
  errors,
}) => {
  const hasError = errors[name] !== undefined;

  return (
    <div className={styles.input__container}>
      <label
        className={`${styles.input__label}${
          hasError ? ` ${styles["input__label--error"]}` : ""
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className={`${styles.input__field}${
          hasError ? ` ${styles["input__field--error"]}` : ""
        }`}
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
      />
      {hasError && (
        <span className={styles.error__message}>{errors[name]?.message}</span>
      )}
    </div>
  );
};

export default Input;
