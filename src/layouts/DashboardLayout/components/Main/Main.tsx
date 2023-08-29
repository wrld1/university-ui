import ActionsPanel from "./ActionsPanel";
import ContentWrapper from "./ContentWrapper";
import styles from "./Main.module.scss";

const Main: React.FC = () => {
  return (
    <main className={styles.main__wrapper}>
      <ActionsPanel />
      <ContentWrapper />
    </main>
  );
};

export default Main;
