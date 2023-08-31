import AsideLink from "./AsideLink";
import styles from "../Aside/Aside.module.scss";
import Logout from "./Logout";

const AsideLinkContainer: React.FC = () => {
  return (
    <div className={styles["dashboard__aside--links_container"]}>
      <div className={styles["dashboard__aside--links"]}>
        <AsideLink name="Dashboard" />
        <AsideLink name="Courses" />
        <AsideLink name="Lectors" />
        <AsideLink name="Groups" />
        <AsideLink name="Students" />
      </div>
      <Logout />
    </div>
  );
};

export default AsideLinkContainer;
