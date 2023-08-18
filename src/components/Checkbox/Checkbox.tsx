import React from "react";
import styles from "./Checkbox.module.scss";

const Checkbox = () => {
  return (
    <div className={styles.show__password_container}>
      <input className={styles.show__password_button} type="checkbox" />
      <p className={styles.show__password_text}>Show Password</p>
    </div>
  );
};

export default Checkbox;
