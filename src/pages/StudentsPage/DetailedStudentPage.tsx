import React, { useEffect } from "react";
import styles from "../../styles/pages/DetailedStudentPage.module.scss";
import DetailedPageHeader from "../../components/PagesComponents/DetailedPageHeader/DetailedPageHeader";
import { useParams } from "react-router-dom";
import StudentPageInformation from "../../components/PagesComponents/StudentPageInformation/StudentPageInformation";
import useFetchStudentsData from "./useFetchStudentsData";
import { getStudents } from "../../api/students.api";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { selectLoading } from "../../redux/data/data.slice";
import StudentPageSelect from "../../components/PagesComponents/StudentPageSelect/StudentPageSelect";
import { useNavigate } from "react-router-dom";

const DetailedStudentPage: React.FC = () => {
  const { studentId = "" } = useParams<{ studentId: string }>();
  console.log(studentId);
  const loading = useAppSelector(selectLoading);
  const fetchStudentsData = useFetchStudentsData(getStudents);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  const goToPrevPage = () => {
    navigate("/students");
  };

  return (
    <div className={styles.studentPage__wrapper}>
      <DetailedPageHeader heading="Student" />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles["studentPage__main--wrapper"]}>
          <button
            onClick={goToPrevPage}
            className={styles.back__button}
            type="button"
          >
            Go Back
          </button>
          <div className={styles["studentPage__main--forms"]}>
            <StudentPageInformation studentId={studentId} />
            <StudentPageSelect studentId={studentId} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedStudentPage;
