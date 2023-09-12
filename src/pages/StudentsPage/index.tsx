import { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { selectLoading } from "../../redux/data/data.slice";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getStudents } from "../../api/students.api";
import NoData from "../../components/NoData/NoData";
import { selectStudentApiData } from "../../redux/students/students.slice";
import DataTable from "../../components/DataTable/DataTable";
import useFetchStudentsData from "./useFetchStudentsData";
import MainContent from "../../components/LayoutsComponents/Main/MainContent";
import ActionsPanel from "../../components/LayoutsComponents/Main/ActionsPanel";

const StudentsPage: React.FC = () => {
  const loading = useAppSelector(selectLoading);
  const studentsData = useAppSelector(selectStudentApiData);

  const fetchStudentsData = useFetchStudentsData(getStudents);

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
