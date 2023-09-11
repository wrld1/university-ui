import { useCallback, useEffect } from "react";
import MainContent from "../../components/layouts/Main/MainContent";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import toast from "react-hot-toast";
import {
  selectLoading,
  setLoading,
  setPageType,
} from "../../redux/data/data.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getCourses } from "../../api/courses.api";
import {
  CourseApiResponse,
  CoursePageData,
} from "../../types/Course.interface";
import {
  selectCourseApiData,
  setCourseApiData,
  setCoursePageData,
} from "../../redux/courses/courses.slice";
import NoData from "../../components/NoData/NoData";
import ActionsPanel from "../../components/layouts/Main/ActionsPanel";
import DataTable from "../../components/DataTable/DataTable";

const CoursesPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const coursesData = useAppSelector(selectCourseApiData);

  const fetchCoursesData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getCourses();

      const transformedData: CoursePageData[] = response.data.map(
        (item: CourseApiResponse) => {
          const { createdAt, updatedAt, lectors, marks, ...rest } = item;
          const formattedLectors = lectors?.length ? lectors : "No lectors";
          return { ...rest, lectors: formattedLectors };
        }
      );
      dispatch(setCourseApiData(response.data));
      dispatch(setCoursePageData(transformedData));
      dispatch(setPageType("courses"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [dispatch]);

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
