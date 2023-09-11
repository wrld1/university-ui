import { useCallback, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import toast from "react-hot-toast";
import {
  selectLoading,
  setLoading,
  setPageType,
} from "../../redux/data/data.slice";
import {
  selectLectorApiData,
  setLectorApiData,
  setLectorPageData,
} from "../../redux/lectors/lectors.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getLectors } from "../../api/lectors.api";
import MainContent from "../../components/layouts/Main/MainContent";
import {
  LectorApiResponse,
  LectorPageData,
} from "../../types/Lector.interface";
import NoData from "../../components/NoData/NoData";
import ActionsPanel from "../../components/layouts/Main/ActionsPanel";
import DataTable from "../../components/DataTable/DataTable";

const LectorsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const lectorsData = useAppSelector(selectLectorApiData);

  const fetchLectorsData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getLectors();

      const transformedData: LectorPageData[] = response.data.map(
        (item: LectorApiResponse) => {
          const { password, createdAt, updatedAt, name, courses, ...rest } =
            item;
          const formattedName = name || "No Name";
          const formattedCourses = courses?.length ? courses : "No courses";
          return { ...rest, name: formattedName, courses: formattedCourses };
        }
      );
      dispatch(setLectorApiData(response.data));
      dispatch(setLectorPageData(transformedData));
      dispatch(setPageType("lectors"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLectorsData();
  }, [fetchLectorsData]);

  return (
    <DashboardLayout heading="Lectors">
      {loading ? (
        <p>Loading...</p>
      ) : lectorsData.length ? (
        <MainContent>
          <ActionsPanel />
          <DataTable />
        </MainContent>
      ) : (
        <MainContent>
          <ActionsPanel />
          <NoData entity={"lectors"} />
        </MainContent>
      )}
    </DashboardLayout>
  );
};

export default LectorsPage;
