import styles from "./App.module.scss";
import RegisterPage from "./components/pages/RegisterPage";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import ErrorPage from "./components/pages/ErrorPage";
import ForgotPassPage from "./components/pages/ForgotPassPage";
import ResetPassPage from "./components/pages/ResetPassPage";

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
        <Route
          path="*"
          element={
            <div>
              <h2>404 Page not found</h2>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
