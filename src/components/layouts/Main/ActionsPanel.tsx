import AddButton from "./AddButton";
import styles from "./Main.module.scss";
import SearchInput from "./SearchInput";
import SortBySelect from "./SortBySelect";

const ActionsPanel: React.FC = () => {
  return (
    <div className={styles.actions__wrapper}>
      <label className={styles.actions__label} htmlFor="sort">
        Sort By
      </label>
      <SortBySelect />
      <SearchInput />
      <AddButton />
    </div>
  );
};

export default ActionsPanel;
