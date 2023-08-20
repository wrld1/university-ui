import styles from "./AuthLayout.module.scss";
import Logo from "../Logo/Logo";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form__container}>
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
