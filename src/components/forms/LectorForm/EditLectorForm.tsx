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
import { editLector, getLectors } from "../../../api/lectors.api";
import { LectorApiResponse } from "../../../types/Lector.interface";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { selectLectorApiData } from "../../../redux/lectors/lectors.slice";
import useFetchLectorsData from "../../../pages/LectorsPage/useFetchLectorsData";

interface LectorFormData {
  name?: string;
  email?: string;
  password?: string;
}

export type EditLectorFormProps = {
  entityId: string;
  onClose: () => void;
};

const schema = yup.object().shape({
  name: yup.string().optional(),
  email: yup.string().email("Invalid email").optional(),
  password: yup
    .string()
    .test(
      "is-password-present",
      "Password must be at least 6 characters and contain a number and a special character",
      (value) => {
        if (!value || value === "") {
          return true;
        }
        return (
          value.length >= 6 && /\d/.test(value) && /[^a-zA-Z0-9]/.test(value)
        );
      }
    ),
});

const EditLectorForm: React.FC<EditLectorFormProps> = ({
  entityId,
  onClose,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const lectorData: LectorApiResponse[] = useAppSelector(selectLectorApiData);
  const fetchLectorsData = useFetchLectorsData(getLectors);
  const currentLector = lectorData.find((item) => item.id === entityId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LectorFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<LectorFormData> = async (
    data: LectorFormData
  ) => {
    try {
      const editedData: LectorFormData = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const typedKey = key as keyof LectorFormData;
          if (
            data[typedKey] !== undefined &&
            data[typedKey] !== null &&
            data[typedKey] !== ""
          ) {
            editedData[typedKey] = data[typedKey];
          }
        }
      }

      if (Object.keys(editedData).length === 0) {
        toast.error("No changes detected.");
        return;
      }

      const response = await editLector(entityId, editedData);
      toast.success("Data edited successfully");
      reset();
      onClose();
      fetchLectorsData();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <FormTitle title="Edit lector" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder={currentLector?.name}
          register={register}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder={currentLector?.email}
          register={register}
          errors={errors}
        />
        <Input
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder={currentLector?.password}
          register={register}
          errors={errors}
        />
        <Checkbox checked={showPassword} onChange={handleShowPasswordChange} />
        <Button buttonText="Edit Lector" type="submit" />
      </form>
    </>
  );
};

export default EditLectorForm;
