import { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { selectLoading } from "../../redux/data/data.slice";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import NoData from "../../components/NoData/NoData";
import DataTable from "../../components/DataTable/DataTable";
import { getGroups } from "../../api/groups.api";
import { selectGroupApiData } from "../../redux/groups/groups.slice";
import useFetchGroupsData from "./useFetchGroupsData";
import MainContent from "../../components/LayoutsComponents/Main/MainContent";
import ActionsPanel from "../../components/LayoutsComponents/Main/ActionsPanel";

const GroupsPage: React.FC = () => {
  const loading = useAppSelector(selectLoading);
  const groupsData = useAppSelector(selectGroupApiData);

  const fetchGroupsData = useFetchGroupsData(getGroups);

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
