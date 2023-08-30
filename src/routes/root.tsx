import styles from "../styles/pages/errorPage.module.scss";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import ResetPassPage from "../pages/ResetPassPage";
import DashboardPage from "../pages/DashboardPage";
import CoursesPage from "../pages/CoursesPage";
import LectorsPage from "../pages/LectorsPage";
import GroupsPage from "../pages/GroupsPage";
import StudentsPage from "../pages/StudentsPage";

const routerRoot = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/sign-in",
    element: <LoginPage />,
  },
  {
    path: "/sign-up",
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPassPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "courses",
    element: <CoursesPage />,
  },
  {
    path: "lectors",
    element: <LectorsPage />,
  },
  {
    path: "groups",
    element: <GroupsPage />,
  },
  {
    path: "students",
    element: <StudentsPage />,
  },
  {
    path: "*",
    element: (
      <div id="error-page" className={styles.wrapper}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
      </div>
    ),
  },
]);

export default routerRoot;
