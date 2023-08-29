import styles from "./Main.module.scss";

const ContentRow: React.FC = () => {
  return (
    <div className={styles.content__row}>
      <span className={styles["content__column--name"]}>Name</span>
      <span className={styles["content__column--name"]}>Surname</span>
      <span className={styles["content__column--name"]}>Email</span>
      <span className={styles["content__column--name"]}>Password</span>
    </div>
  );
};

export default ContentRow;
