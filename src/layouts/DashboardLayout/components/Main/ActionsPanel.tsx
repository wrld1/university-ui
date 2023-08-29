import AddButton from "./AddButton";
import styles from "./Main.module.scss";

const ActionsPanel: React.FC = () => {
  return (
    <div className={styles.actions__wrapper}>
      <label className={styles.actions__label} htmlFor="sort">
        Sort By
      </label>
      <select name="sort" id="sort">
        <option value="all">all</option>
        <option value="1">A-Z</option>
        <option value="2">Z-A</option>
        <option value="Newest First">Newest First</option>
        <option value="Latest First">Latest First</option>
      </select>
      <AddButton />
    </div>
  );
};

export default ActionsPanel;
