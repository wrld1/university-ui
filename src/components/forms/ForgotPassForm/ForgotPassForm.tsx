import styles from "../../../styles/forms/authForm.module.scss";
import SubmitButton from "../../SubmitButton/SubmitButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "../../Input/Input";

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    reset();
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
      <SubmitButton buttonText="Reset" />
    </form>
  );
};

export default ForgotPassForm;
