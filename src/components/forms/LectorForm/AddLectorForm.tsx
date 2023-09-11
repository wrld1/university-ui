import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import Checkbox from "../../Checkbox/Checkbox";
import FormTitle from "../../FormTitle/FormTitle";
import { createLector } from "../../../api/lectors.api";

export type AddLectorFormProps = {
  onClose: () => void;
};

const schema = yup
  .object({
    name: yup.string().required(),
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

const AddLectorForm: React.FC<AddLectorFormProps> = ({ onClose }) => {
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

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await createLector({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      console.log(response);
      toast.success("Lector created successfully");
      reset();
      onClose();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormTitle title="Create new lector" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          register={register}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="yourmail@gmail.com"
          register={register}
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
        <Button buttonText="Create Lector" type="submit" />
      </form>
    </>
  );
};

export default AddLectorForm;
