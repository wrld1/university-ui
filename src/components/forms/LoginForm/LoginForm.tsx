import styles from "../../../styles/forms/authForm.module.scss";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../Input/Input";
import Checkbox from "../../Checkbox/Checkbox";
import { useState } from "react";
import { signIn } from "../../../api/auth.api";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { getUsersReq } from "../../../redux/users/action.creators";
import { setCredentials } from "../../../redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .matches(/\d/, "Password must contain a number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain a special character")
      .required("Password is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await signIn(data);

      localStorage.setItem("accessToken", response.data.accessToken);
      const userResponse = await dispatch(getUsersReq());
      dispatch(setCredentials(userResponse.payload));

      navigate("/lectors");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        name="email"
        type="email"
        register={register}
        placeholder="yourmail@gmail.com"
        errors={errors}
      />
      <Input
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="password!2"
        register={register}
        errors={errors}
      />
      <Checkbox checked={showPassword} onChange={handleShowPasswordChange} />
      <SubmitButton buttonText="Login" />
    </form>
  );
};

export default LoginForm;
