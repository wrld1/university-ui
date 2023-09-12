import styles from "./DashboardLayout.module.scss";
import Aside from "../../components/LayoutsComponents/Aside/Aside";
import Header from "../../components/LayoutsComponents/Header/Header";
import { memo } from "react";

interface DashboardLayoutProps {
  heading: string;
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  heading,
  children,
}) => {
  return (
    <div className={styles.wrapper}>
      <Aside />
      <div className={styles.content__wrapper}>
        <Header heading={heading} />
        {children}
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
