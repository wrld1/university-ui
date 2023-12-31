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
import AuthWrapper from "../components/AuthWrapper/AuthWrapper";
import DetailedStudentPage from "../pages/StudentsPage/DetailedStudentPage";
import DetailedLectorPage from "../pages/LectorsPage/DetailedLectorPage";
import DetailedCoursePage from "../pages/CoursesPage/DetailedCoursePage";
import DetailedGroupPage from "../pages/GroupsPage/DetailedGroupPage";

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
    element: (
      <AuthWrapper>
        <DashboardPage />
      </AuthWrapper>
    ),
  },
  {
    path: "courses",
    element: (
      <AuthWrapper>
        <CoursesPage />
      </AuthWrapper>
    ),
  },
  {
    path: "courses/:courseId",
    element: (
      <AuthWrapper>
        <DetailedCoursePage />
      </AuthWrapper>
    ),
  },
  {
    path: "lectors",
    element: (
      <AuthWrapper>
        <LectorsPage />
      </AuthWrapper>
    ),
  },
  {
    path: "lectors/:lectorId",
    element: (
      <AuthWrapper>
        <DetailedLectorPage />
      </AuthWrapper>
    ),
  },
  {
    path: "groups",
    element: (
      <AuthWrapper>
        <GroupsPage />
      </AuthWrapper>
    ),
  },
  {
    path: "groups/:groupId",
    element: (
      <AuthWrapper>
        <DetailedGroupPage />
      </AuthWrapper>
    ),
  },
  {
    path: "students",
    element: (
      <AuthWrapper>
        <StudentsPage />
      </AuthWrapper>
    ),
  },
  {
    path: "students/:studentId",
    element: (
      <AuthWrapper>
        <DetailedStudentPage />
      </AuthWrapper>
    ),
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
