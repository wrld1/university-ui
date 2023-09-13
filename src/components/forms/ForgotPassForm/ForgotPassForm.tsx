import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../Input/Input";

import { resetPassRequest } from "../../../api/auth.api";

const schema = yup
  .object({
    email: yup.string().email("Invalid email").required("Email is required"),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

const ForgotPassForm: React.FC = () => {
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
      const response = await resetPassRequest({
        email: data.email,
      });

      reset();
    } catch (error) {
      console.error(error);
    }
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
      <Button buttonText="Reset" type="submit" />
    </form>
  );
};

export default ForgotPassForm;
