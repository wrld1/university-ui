import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import FormTitle from "../../FormTitle/FormTitle";
import { createCourse, getCourses } from "../../../api/courses.api";
import useFetchCoursesData from "../../../pages/CoursesPage/useFetchCoursesData";

export type AddCourseFormProps = {
  onClose: () => void;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  hours: yup
    .number()
    .required("Hours is required")
    .positive("Hours must be a positive number")
    .integer("Hours must be an integer"),
});

type FormData = yup.InferType<typeof schema>;

const AddCourseForm: React.FC<AddCourseFormProps> = ({ onClose }) => {
  const fetchCourses = useFetchCoursesData(getCourses);
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
      const response = await createCourse({
        name: data.name,
        description: data.description,
        hours: Number(data.hours),
      });

      toast.success("Course created successfully");
      fetchCourses();
      reset();
      onClose();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  return (
    <>
      <FormTitle title="Create new course" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Name of course"
          register={register}
          errors={errors}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder="This course covers basics of:"
          register={register}
          errors={errors}
        />
        <Input
          label="Hours"
          name="hours"
          type="text"
          placeholder="25"
          register={register}
          errors={errors}
        />
        <Button buttonText="Create Course" type="submit" />
      </form>
    </>
  );
};

export default AddCourseForm;
