import styles from "../../../styles/pages/authPage.module.scss";
import AuthLayout from "../../AuthLayout/AuthLayout";
import FormTitle from "../../FormTitle/FormTitle";
import ForgotPassForm from "../../forms/ForgotPassForm/ForgotPassForm";
import { Link } from "react-router-dom";

const ForgotPassPage: React.FC = () => {
  return (
    <AuthLayout>
      <FormTitle title="Forgot password?" />
      <p className={styles.subtitle}>
        Don't worry, happens to the best of us. Enter the email address
        associated with your account and we'll send you a link to reset.
      </p>
      <ForgotPassForm />
      <Link className={styles.cancel__button} to="/sign-in">
        Cancel
      </Link>
    </AuthLayout>
  );
};

export default ForgotPassPage;
