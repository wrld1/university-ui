import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import FormTitle from "../../FormTitle/FormTitle";
import { createStudent, getStudents } from "../../../api/students.api";
import useFetchStudentsData from "../../../pages/StudentsPage/useFetchStudentsData";

export type AddStudentFormProps = {
  onClose: () => void;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  imagePath: yup.string().required("Image path is required"),
});

type FormData = yup.InferType<typeof schema>;

const AddStudentForm: React.FC<AddStudentFormProps> = ({ onClose }) => {
  const fetchStudentsData = useFetchStudentsData(getStudents);
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
      await createStudent({
        name: data.name,
        surname: data.surname,
        email: data.email,
        age: Number(data.age),
        imagePath: data.imagePath,
      });

      toast.success("Student created successfully");
      fetchStudentsData();
      reset();
      onClose();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <FormTitle title="Create new student" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Name of student"
          register={register}
          errors={errors}
        />
        <Input
          label="Surname"
          name="surname"
          type="text"
          placeholder="Surname of student"
          register={register}
          errors={errors}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="studentmail@gmail.com"
          register={register}
          errors={errors}
        />
        <Input
          label="Age"
          name="age"
          type="text"
          placeholder="20"
          register={register}
          errors={errors}
        />
        <Input
          label="ImagePath"
          name="imagePath"
          type="text"
          placeholder="link/to/image"
          register={register}
          errors={errors}
        />
        <Button buttonText="Create Student" type="submit" />
      </form>
    </>
  );
};

export default AddStudentForm;
