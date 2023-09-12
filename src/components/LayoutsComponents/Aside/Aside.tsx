import styles from "./Aside.module.scss";
import AsideLinkContainer from "./AsideLinkContainer";
import Logo from "../../Logo/Logo";

const Aside: React.FC = () => {
  return (
    <aside className={styles.dashboard__aside}>
      <div className={styles["dashboard__aside--header"]}>
        <Logo dashboard />
      </div>
      <AsideLinkContainer />
    </aside>
  );
};

export default Aside;
