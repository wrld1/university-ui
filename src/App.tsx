import React from "react";
import styles from "./App.module.scss";
import logo from "./images/Logo.png";
import AuthForm from "./components/AuthForm/AuthForm";
import Input from "./components/Input/Input";

function App() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        <img className={styles.logo} src={logo} alt="Logo" />
        {/* <AuthForm title="Welcome!" buttonText="Login">
          <Input label="Username" placeholder="Enter username" />
          <Input label="Email" placeholder="Enter email" type="email" />
        </AuthForm> */}
        <AuthForm />
      </div>
    </div>
  );
}

export default App;
