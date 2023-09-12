import React from "react";
import styles from "../../styles/pages/DetailedStudentPage.module.scss";
import DetailedPageHeader from "../../components/PagesComponents/DetailedPageHeader/DetailedPageHeader";

const DetailedStudentPage: React.FC = () => {
  return (
    <div className={styles.studentPage__wrapper}>
      <DetailedPageHeader heading="Student" />
      <div className={styles["studentPage__main--wrapper"]}></div>
    </div>
  );
};

export default DetailedStudentPage;
