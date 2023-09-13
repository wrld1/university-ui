import styles from "./StudentPageInformation.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { selectStudentApiData } from "../../../redux/students/students.slice";
import { useAppSelector } from "../../../utils/hooks/useAppSelector";
import { StudentApiResponse } from "../../../types/Student.interface";
import useFetchStudentsData from "../../../pages/StudentsPage/useFetchStudentsData";
import { editStudent, getStudents } from "../../../api/students.api";
import FormTitle from "../../FormTitle/FormTitle";
import ImagePlaceholder from "../../../assets/images/ImagePlaceholder.png";

interface StudentFormData {
  name?: string;
  surname?: string;
  age?: string;
  email?: string;
}

export type EditStudentFormProps = {
  studentId: string;
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
        const ageValue =
          typeof value === "string" ? parseInt(value, 10) : value;

        if (!ageValue || ageValue === "") {
          return true;
        }
        if (typeof ageValue !== "number") {
          return false;
        }
        return ageValue > 0 && Number.isInteger(ageValue);
      }
    )
    .nullable(),
});

const StudentPageInformation: React.FC<EditStudentFormProps> = ({
  studentId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: yupResolver(schema) as any,
  });

  const studentData: StudentApiResponse[] =
    useAppSelector(selectStudentApiData);
  const fetchStudentsData = useFetchStudentsData(getStudents);
  const currentStudent = studentData.find((item) => item.id == studentId);

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

      const response = await editStudent(studentId, editedData);
      toast.success("Data edited successfully");
      fetchStudentsData();
      reset();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  return (
    <div className={styles["edit__form--wrapper"]}>
      <FormTitle title="Personal information" />
      <div className={styles.photo__section}>
        <img src={ImagePlaceholder} alt="Student" />
        <div className={styles["photo__description--container"]}>
          <button className={styles["photo__replace--button"]} type="button">
            Replace
          </button>
          <p className={styles["photo__description--text"]}>No file chosen</p>
          <p className={styles["photo__description--text"]}>
            Must be a .jpg or .png file smaller than 10MB and at least 400px by
            400px.
          </p>
        </div>
      </div>
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
        <Button buttonText="Save changes" type="submit" />
      </form>
    </div>
  );
};

export default StudentPageInformation;
