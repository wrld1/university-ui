import MainContent from "../../components/LayoutsComponents/Main/MainContent";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import styles from "../../styles/pages/DashboardPage.module.scss";

const DashboardPage: React.FC = () => {
  return (
    <DashboardLayout heading="Dashboard">
      <MainContent>
        <div className={styles.dashboard__wrapper}>
          <p className={styles.dashboard__description}>
            Welcome to S-Pro university!
          </p>
        </div>
      </MainContent>
    </DashboardLayout>
  );
};

export default DashboardPage;
