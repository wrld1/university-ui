import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import FormTitle from "../../FormTitle/FormTitle";
import { useAppDispatch } from "../../../utils/hooks/useAppDispatch";
import { setModal } from "../../../redux/modal/modal.slice";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { selectStudentApiData } from "../../../redux/students/students.slice";
import { StudentApiResponse } from "../../../types/Student.interface";
import { editStudent } from "../../../api/students.api";

interface StudentFormData {
  name?: string;
  surname?: string;
  age?: string;
  email?: string;
  imagePath?: string;
}

export type EditStudentFormProps = {
  entityId: string;
  onClose: () => void;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").optional(),
  name: yup.string().optional(),
  surname: yup.string().optional(),
  age: yup
    .mixed()
    .test(
      "is-valid-age",
      "Age must be a positive integer if provided",
      (value) => {
        if (!value || value === "") {
          return true;
        }

        if (typeof value !== "number") {
          return false;
        }

        return value > 0 && Number.isInteger(value);
      }
    )
    .nullable(),
  imagePath: yup.string().optional(),
});

const EditStudentForm: React.FC<EditStudentFormProps> = ({
  entityId,
  onClose,
}) => {
  const studentData: StudentApiResponse[] =
    useAppSelector(selectStudentApiData);
  const currentStudent = studentData.find((item) => item.id === entityId);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<StudentFormData> = async (
    data: StudentFormData
  ) => {
    try {
      const editedData: StudentFormData = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const typedKey = key as keyof StudentFormData;
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

      const response = await editStudent(entityId, editedData);
      console.log(response);
      toast.success("Data edited successfully");
      reset();
      onClose();
      dispatch(setModal(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
    console.log("edit onSubmit called");
  };

  return (
    <>
      <FormTitle title="Edit student" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder={currentStudent?.name}
          register={register}
          errors={errors}
        />
        <Input
          label="Surname"
          name="surname"
          type="text"
          placeholder={currentStudent?.surname}
          register={register}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder={currentStudent?.email}
          register={register}
          errors={errors}
        />
        <Input
          label="Age"
          name="age"
          type="text"
          placeholder={currentStudent?.age}
          register={register}
          errors={errors}
        />
        <Input
          label="ImagePath"
          name="imagePath"
          type="text"
          placeholder={currentStudent?.imagePath}
          register={register}
          errors={errors}
        />
        <Button buttonText="Edit student" type="submit" />
      </form>
    </>
  );
};

export default EditStudentForm;