import styles from "./Header.module.scss";
import avatar from "../../../assets/images/Avatar.png";

interface HeaderProps {
  heading: string;
}

const Header: React.FC<HeaderProps> = ({ heading }) => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>{heading}</h1>
      <div className={styles.header__image}>
        <img src={avatar} alt="Profile" />
      </div>
    </header>
  );
};

export default Header;
