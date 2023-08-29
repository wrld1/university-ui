import styles from "./Main.module.scss";
import { ReactComponent as PlusIcon } from "../../../../assets/icons/PlusIcon.svg";

const AddButton: React.FC = () => {
  return (
    <button className={styles.add_button}>
      <PlusIcon /> Add new Lector
    </button>
  );
};

export default AddButton;
