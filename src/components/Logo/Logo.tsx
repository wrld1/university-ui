import styles from "./Logo.module.scss";
import logo from "../../assets/images/Logo.png";

const Logo = () => {
  return (
    <div>
      <img className={styles.logo} src={logo} alt="Logo" />
    </div>
  );
};

export default Logo;
