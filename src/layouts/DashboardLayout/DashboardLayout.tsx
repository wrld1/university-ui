import styles from "./DashboardLayout.module.scss";
import Aside from "./components/Aside/Aside";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";

interface DashboardLayoutProps {
  heading: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ heading }) => {
  return (
    <div className={styles.wrapper}>
      <Aside />
      <div className={styles.content__wrapper}>
        <Header heading={heading} />
        <Main />
      </div>
    </div>
  );
};

export default DashboardLayout;
