import { useRouteError } from "react-router-dom";
import styles from "../../styles/pages/errorPage.module.scss";

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();
  return (
    <div id="error-page" className={styles.wrapper}>
      <h1 className={styles.heading}>Oops!</h1>
      <p className={styles.subheading}>
        Sorry, an unexpected error has occurred.
      </p>
      <p className={styles.error__message}>
        <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;
