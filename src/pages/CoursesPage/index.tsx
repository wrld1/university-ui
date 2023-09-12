import { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { selectLoading } from "../../redux/data/data.slice";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getCourses } from "../../api/courses.api";
import { selectCourseApiData } from "../../redux/courses/courses.slice";
import NoData from "../../components/NoData/NoData";
import MainContent from "../../components/LayoutsComponents/Main/MainContent";
import ActionsPanel from "../../components/LayoutsComponents/Main/ActionsPanel";
import DataTable from "../../components/DataTable/DataTable";
import useFetchCoursesData from "./useFetchCoursesData";

const CoursesPage: React.FC = () => {
  const loading = useAppSelector(selectLoading);
  const coursesData = useAppSelector(selectCourseApiData);

  const fetchCoursesData = useFetchCoursesData(getCourses);

  useEffect(() => {
    fetchCoursesData();
  }, [fetchCoursesData]);

  return (
    <DashboardLayout heading="Courses">
      {loading ? (
        <p>Loading...</p>
      ) : coursesData.length ? (
        <MainContent>
          <ActionsPanel />
          <DataTable />
        </MainContent>
      ) : (
        <MainContent>
          <ActionsPanel />
          <NoData entity={"courses"} />
        </MainContent>
      )}
    </DashboardLayout>
  );
};

export default CoursesPage;
