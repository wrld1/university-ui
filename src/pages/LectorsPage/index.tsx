import { useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

import { selectLoading } from "../../redux/data/data.slice";
import { selectLectorApiData } from "../../redux/lectors/lectors.slice";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { getLectors } from "../../api/lectors.api";
import NoData from "../../components/NoData/NoData";
import DataTable from "../../components/DataTable/DataTable";
import useFetchLectorsData from "./useFetchLectorsData";
import MainContent from "../../components/LayoutsComponents/Main/MainContent";
import ActionsPanel from "../../components/LayoutsComponents/Main/ActionsPanel";

const LectorsPage: React.FC = () => {
  const loading = useAppSelector(selectLoading);
  const lectorsData = useAppSelector(selectLectorApiData);

  const fetchLectorsData = useFetchLectorsData(getLectors);

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
