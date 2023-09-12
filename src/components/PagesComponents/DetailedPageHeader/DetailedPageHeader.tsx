import styles from "./DetailedPageHeader.module.scss";
import avatar from "../../../assets/images/Avatar.png";
import logo from "../../../assets/images/Logo.png";

interface HeaderProps {
  heading: string;
}

const DetailedPageHeader: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <header className={styles.header}>
      <img className={styles.header__logo} src={logo} alt="Logo" />
      <h1 className={styles.header__title}>{heading}</h1>
      <div className={styles.header__image}>
        <img src={avatar} alt="Profile" />
      </div>
    </header>
  );
};

export default DetailedPageHeader;
