import styles from "./styles/pages/errorPage.module.scss";
import RegisterPage from "./pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ErrorPage from "./pages/ErrorPage";
import ForgotPassPage from "./pages/ForgotPassPage";
import ResetPassPage from "./pages/ResetPassPage";
import LectorsPage from "./pages/LectorsPage";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          errorElement={<ErrorPage />}
          element={<Navigate to="/sign-up" />}
        />
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassPage />} />
        <Route path="/reset-password" element={<ResetPassPage />} />
        <Route path="/lectors" element={<LectorsPage />} />
        <Route
          path="*"
          element={
            <div id="error-page" className={styles.wrapper}>
              <h1>Oops!</h1>
              <p>Sorry, an unexpected error has occurred.</p>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
