import MainContent from "../../components/LayoutsComponents/Main/MainContent";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout heading="Dashboard">
      <MainContent />
    </DashboardLayout>
  );
};

export default DashboardPage;
