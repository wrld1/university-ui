import React from "react";
import styles from "./App.module.scss";
import logo from "./images/Logo.png";
import InputForm from "./components/InputForm/InputForm";
import Input from "./components/Input/Input";

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        <img className={styles.logo} src={logo} alt="Logo" />
        <InputForm title="Welcome!" buttonText="Login">
          <Input label="Username" placeholder="Enter username" />
          <Input label="Email" placeholder="Enter email" type="email" />
        </InputForm>
      </div>
    </div>
  );
}

export default App;
