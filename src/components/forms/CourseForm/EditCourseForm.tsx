import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import styles from "../../../styles/forms/Form.module.scss";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import FormTitle from "../../FormTitle/FormTitle";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { selectLectorApiData } from "../../../redux/lectors/lectors.slice";
import { CourseApiResponse } from "../../../types/Course.interface";
import { editCourse, getCourses } from "../../../api/courses.api";
import useFetchCoursesData from "../../../pages/CoursesPage/useFetchCoursesData";

interface CourseFormData {
  name?: string;
  description?: string;
  hours?: string;
}

export type EditCourseFormProps = {
  entityId: string;
  onClose: () => void;
};

const schema = yup.object().shape({
  name: yup.string().optional(),
  description: yup.string().optional(),
  hours: yup
    .number()
    .optional()
    .positive("Hours must be a positive number")
    .integer("Hours must be an integer"),
});

const EditCourseForm: React.FC<EditCourseFormProps> = ({
  entityId,
  onClose,
}) => {
  const courseData: CourseApiResponse[] = useAppSelector(selectLectorApiData);
  const fetchCourses = useFetchCoursesData(getCourses);
  const currentCourse = courseData.find((item) => item.id === entityId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CourseFormData>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<CourseFormData> = async (
    data: CourseFormData
  ) => {
    try {
      const editedData: CourseFormData = {};

      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const typedKey = key as keyof CourseFormData;
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

      await editCourse(entityId, editedData);
      toast.success("Data edited successfully");
      fetchCourses();
      reset();
      onClose();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
    console.log("edit onSubmit called");
  };

  return (
    <>
      <FormTitle title="Edit group" />
      <form className={styles.input__form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder={currentCourse?.name}
          register={register}
          errors={errors}
        />
        <Input
          label="Description"
          name="description"
          type="text"
          placeholder={currentCourse?.description}
          register={register}
          errors={errors}
        />
        <Input
          label="Hours"
          name="hours"
          type="text"
          placeholder={currentCourse?.hours}
          register={register}
          errors={errors}
        />
        <Button buttonText="Edit Course" type="submit" />
      </form>
    </>
  );
};

export default EditCourseForm;
