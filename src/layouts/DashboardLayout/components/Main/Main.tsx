import styles from "./Main.module.scss";

interface MainProps {
  heading: string;
}

const Main: React.FC<MainProps> = ({ heading }) => {
  return (
    <div className={styles.main__wrapper}>
      <div className={styles.main__header}>{heading}</div>
    </div>
  );
};

export default Main;
