import React from "react";
import styles from "./SubmitButton.module.scss";

type buttonType = "button" | "submit" | "reset";

interface ButtonProps {
  buttonText: string;
  type: buttonType;
}

const Button: React.FC<ButtonProps> = ({ buttonText, type }) => {
  return (
    <button className={styles.submit__button} type={type}>
      {buttonText}
    </button>
  );
};

export default Button;
