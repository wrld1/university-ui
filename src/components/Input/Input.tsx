import React, { InputHTMLAttributes } from "react";
import {
  Path,
  useForm,
  UseFormRegister,
  SubmitHandler,
  DeepMap,
  FieldValues,
  FieldError,
} from "react-hook-form";
import styles from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  type: string;
  errors: DeepMap<FieldValues, FieldError>;
  validationSchema?: any;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  register,
  type = "text",
  errors,
  validationSchema,
}) => (
  <div className={styles.input__container}>
    <label className={styles.input__label} htmlFor={name}>
      {label}
    </label>
    <input
      className={styles.input__field}
      id={name}
      type={type}
      {...register(name, validationSchema)}
    />
    {errors && errors[name]?.type === "required" && (
      <span className={styles.input__error}>{errors[name]?.message}</span>
    )}
    {errors && errors[name]?.type === "minLength" && (
      <span className={styles.input__error}>{errors[name]?.message}</span>
    )}
  </div>
);

export default Input;
