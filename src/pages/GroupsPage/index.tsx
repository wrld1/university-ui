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
import NoData from "../../components/NoData/NoData";
import ActionsPanel from "../../components/layouts/Main/ActionsPanel";
import DataTable from "../../components/DataTable/DataTable";
import { getGroups } from "../../api/groups.api";
import { GroupApiResponse, GroupPageData } from "../../types/Group.interface";
import {
  selectGroupApiData,
  setGroupApiData,
  setGroupPageData,
} from "../../redux/groups/groups.slice";

const GroupsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const groupsData = useAppSelector(selectGroupApiData);

  const fetchGroupsData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getGroups();

      const transformedData: GroupPageData[] = response.data.map(
        (item: GroupApiResponse) => {
          const { createdAt, updatedAt, students, ...rest } = item;
          const formattedStudents = students?.length ? students : "No students";
          return { ...rest, students: formattedStudents };
        }
      );
      dispatch(setGroupApiData(response.data));
      dispatch(setGroupPageData(transformedData));
      dispatch(setPageType("groups"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchGroupsData();
  }, [fetchGroupsData]);

  return (
    <DashboardLayout heading="Groups">
      {loading ? (
        <p>Loading...</p>
      ) : groupsData.length ? (
        <MainContent>
          <ActionsPanel />
          <DataTable />
        </MainContent>
      ) : (
        <MainContent>
          <ActionsPanel />
          <NoData entity="groups" />
        </MainContent>
      )}
    </DashboardLayout>
  );
};

export default GroupsPage;
