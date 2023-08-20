import styles from "./RegisterForm.module.scss";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormTitle from "../../FormTitle/FormTitle";
import Input from "../../Input/Input";
import Checkbox from "../../Checkbox/Checkbox";
import { useState } from "react";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/\d/, "Password must contain a number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain a special character")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
      <FormTitle title="Register your account" />
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        errors={errors}
      />
      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        register={register}
        errors={errors}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        register={register}
        errors={errors}
      />
      <Checkbox checked={showPassword} onChange={handleShowPasswordChange} />
      <SubmitButton buttonText="Register" />
    </form>
  );
};

export default RegisterForm;
