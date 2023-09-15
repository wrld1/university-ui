import styles from "./StudentPageInformation.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import Button from "../../Button/Button";
import Input from "../../Input/Input";
import { StudentApiResponse } from "../../../types/Student.interface";
import { editStudent, getStudentById } from "../../../api/students.api";
import FormTitle from "../../FormTitle/FormTitle";
import ImagePlaceholder from "../../../assets/images/ImagePlaceholder.png";
import { useEffect, useState } from "react";

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
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState<StudentApiResponse | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentData = await getStudentById(studentId);
        setStudent(studentData.data);
        setLoading(false);
      } catch (error: any) {
        toast.error(`Error fetching student data: ${error.message}`);
      }
    };

    fetchData();
  }, [studentId]);

  useEffect(() => {
    if (student && student.imagePath && !imageLoaded) {
      const img = new Image();
      img.src = `http://localhost:3010/uploads/${student.imagePath}`;
      img.onload = () => {
        setImageLoaded(true);
      };
    }
  }, [student, imageLoaded]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormData>({
    resolver: yupResolver(schema) as any,
  });

  const studentPhoto =
    student && student.imagePath && imageLoaded
      ? `http://localhost:3010/uploads/${student.imagePath}`
      : ImagePlaceholder;

  console.log(studentPhoto);

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

      await editStudent(studentId, editedData);
      toast.success("Data edited successfully");
      reset();
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  };

  return (
    <div className={styles["edit__form--wrapper"]}>
      {loading ? (
        <div className={styles["photo__section__image"]}>Loading....</div>
      ) : (
        <>
          <FormTitle title="Personal information" />
          <div className={styles.photo__section}>
            <img
              src={studentPhoto}
              alt="Student"
              className={styles.photo__section__image}
            />
            <div className={styles["photo__description--container"]}>
              <button
                className={styles["photo__replace--button"]}
                type="button"
              >
                Replace
              </button>
              <p className={styles["photo__description--text"]}>
                No file chosen
              </p>
              <p className={styles["photo__description--text"]}>
                Must be a .jpg or .png file smaller than 10MB and at least 400px
                by 400px.
              </p>
            </div>
          </div>
          <form
            className={styles.input__form}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder={student?.name || ""}
              register={register}
              errors={errors}
            />
            <Input
              label="Surname"
              name="surname"
              type="text"
              placeholder={student?.surname || ""}
              register={register}
              errors={errors}
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder={student?.email || ""}
              register={register}
              errors={errors}
            />
            <Input
              label="Age"
              name="age"
              type="text"
              placeholder={student?.age || ""}
              register={register}
              errors={errors}
            />
            <Button buttonText="Save changes" type="submit" />
          </form>
        </>
      )}
    </div>
  );
};

export default StudentPageInformation;
