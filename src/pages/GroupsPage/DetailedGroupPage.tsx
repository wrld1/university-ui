import React from "react";
import styles from "../../styles/pages/DetailedPage.module.scss";
import WorkInProgress from "../../assets/images/WorkInProgress.png";

const DetailedGroupPage: React.FC = () => {
  return (
    <>
      <div className={styles.wrapper}>
        <p>This is detailed group page</p>
        <img src={WorkInProgress} alt="Work in progress" />
      </div>
    </>
  );
};

export default DetailedGroupPage;
