import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";

const ErrorPage: React.FC = () => {
  const error: unknown = useRouteError();
  return (
    <div id="error-page" className={styles.wrapper}>
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="text-slate-400">
        <i>
          {(error as Error)?.message ||
            (error as { statusText?: string })?.statusText}
        </i>
      </p>
    </div>
  );
};

export default ErrorPage;
