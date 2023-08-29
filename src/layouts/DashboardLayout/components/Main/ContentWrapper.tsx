import ContentRow from "./ContentRow";
import styles from "./Main.module.scss";

const ContentWrapper: React.FC = () => {
  return (
    <>
      <div className={styles["content__column--names"]}>
        <span className={styles["content__column--name"]}>Name</span>
        <span className={styles["content__column--name"]}>Surname</span>
        <span className={styles["content__column--name"]}>Email</span>
        <span className={styles["content__column--name"]}>Password</span>
      </div>
      <div>
        <ContentRow />
      </div>
    </>
  );
};

export default ContentWrapper;
