import MainContent from "../../components/layouts/Main/MainContent";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout heading="Lectors">
      <MainContent />
    </DashboardLayout>
  );
};

export default DashboardPage;
