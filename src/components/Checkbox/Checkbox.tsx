import styles from "./Checkbox.module.scss";

interface CheckboxProps {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className={styles.show__password_container}>
      <input
        className={styles.show__password_button}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <p className={styles.show__password_text}>Show Password</p>
    </div>
  );
};

export default Checkbox;
