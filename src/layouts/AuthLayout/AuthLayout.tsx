import styles from "./AuthLayout.module.scss";
import Logo from "../../components/Logo/Logo";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.nav__links}>
          <li>
            <Link to="/sign-up">Register</Link>
          </li>
          <li>
            <Link to="/sign-in">Log In</Link>
          </li>
          <li>
            <Link to="/forgot-password">Forgot Password</Link>
          </li>
          <li>
            <Link to="/reset-password">Reset Password</Link>
          </li>
          <li>
            <Link to="/does-not-exist">Catch all route</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.form__container}>
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
