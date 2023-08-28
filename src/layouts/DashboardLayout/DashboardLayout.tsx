import styles from "./DashboardLayout.module.scss";
import Logo from "../../components/Logo/Logo";
import { ReactNode } from "react";
import AsideLinkContainer from "./components/Aside/AsideLinkContainer";

interface DashboardLayoutProps {
  heading: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  heading: Lectors,
}) => {
  return (
    <div className={styles.wrapper}>
      <aside className={styles.dashboard__aside}>
        <div className={styles["dashboard__aside--header"]}>
          <Logo dashboard />
        </div>
        <AsideLinkContainer />
      </aside>
    </div>
  );
};

export default DashboardLayout;
