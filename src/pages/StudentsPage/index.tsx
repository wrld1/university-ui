import { useCallback, useEffect } from "react";
import MainContent from "../../components/layouts/Main/MainContent";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import {
  selectLoading,
  setLoading,
  setPageType,
} from "../../redux/data/data.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import {
  StudentApiResponse,
  StudentPageData,
} from "../../types/Student.interface";
import { getStudents } from "../../api/students.api";
import NoData from "../../components/NoData/NoData";
import toast from "react-hot-toast";
import {
  selectStudentApiData,
  setStudentApiData,
  setStudentPageData,
} from "../../redux/students/students.slice";
import ActionsPanel from "../../components/layouts/Main/ActionsPanel";
import DataTable from "../../components/DataTable/DataTable";

const StudentsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const studentsData = useAppSelector(selectStudentApiData);

  const fetchStudentsData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getStudents();

      const transformedData: StudentPageData[] = response.data.map(
        (item: StudentApiResponse) => {
          const {
            createdAt,
            updatedAt,
            imagePath,
            groupId,
            marks,
            group,
            ...rest
          } = item;

          const formattedGroup = group || "No Group";
          return { ...rest, group: formattedGroup };
        }
      );
      dispatch(setStudentApiData(response.data));
      dispatch(setStudentPageData(transformedData));
      dispatch(setPageType("students"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStudentsData();
  }, [fetchStudentsData]);

  return (
    <DashboardLayout heading="Students">
      {loading ? (
        <p>Loading...</p>
      ) : studentsData.length ? (
        <MainContent>
          <ActionsPanel />
          <DataTable />
        </MainContent>
      ) : (
        <MainContent>
          <ActionsPanel />
          <NoData entity={"students"} />
        </MainContent>
      )}
    </DashboardLayout>
  );
};

export default StudentsPage;
