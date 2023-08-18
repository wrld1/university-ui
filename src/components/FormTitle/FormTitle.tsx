import React from "react";
import styles from "./FormTitle.module.scss";

interface FormTitleProps {
  title: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return (
    <div>
      <h1 className={styles.form__title}>{title}</h1>
    </div>
  );
};

export default FormTitle;
