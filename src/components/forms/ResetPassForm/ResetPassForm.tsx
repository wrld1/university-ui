import styles from "../../../styles/forms/authForm.module.scss";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../Input/Input";
import Checkbox from "../../Checkbox/Checkbox";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { resetPass } from "../../../api/auth.api";

type ResetPassFormProps = {
  handleShowForm: () => void;
};

const schema = yup
  .object({
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

const ResetPassForm: React.FC<ResetPassFormProps> = ({ handleShowForm }) => {
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

  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const tokenParam = searchParams.get("token");
  const token: string | null = tokenParam !== null ? tokenParam : "";
  const idParam = searchParams.get("id");
  const id: string | null = idParam !== null ? idParam : "";

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    console.log(token);
    console.log(id);
    resetPass(data, token, id);
    reset();
    handleShowForm();
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="New Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="password!2"
        register={register}
        errors={errors}
      />
      <Input
        label="Confirm Password"
        name="confirmPassword"
        type={showPassword ? "text" : "password"}
        placeholder="password!2"
        register={register}
        errors={errors}
      />
      <Checkbox checked={showPassword} onChange={handleShowPasswordChange} />
      <SubmitButton buttonText="Reset" />
    </form>
  );
};

export default ResetPassForm;
