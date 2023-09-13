import React from "react";
import styles from "./FormTitle.module.scss";

interface FormTitleProps {
  title: string;
}

const FormTitle: React.FC<FormTitleProps> = ({ title }) => {
  return (
    <div>
      <h2 className={styles.form__title}>{title}</h2>
    </div>
  );
};

export default FormTitle;
