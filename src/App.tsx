import styles from "./App.module.scss";
import RegisterPage from "./components/pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
