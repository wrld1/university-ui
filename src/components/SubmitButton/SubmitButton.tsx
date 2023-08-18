import React from "react";
import styles from "./SubmitButton.module.scss";

interface SubmitButtonProps {
  buttonText: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ buttonText }) => {
  return (
    <button className={styles.submit__button} type="submit">
      {buttonText}
    </button>
  );
};

export default SubmitButton;
