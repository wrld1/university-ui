import styles from "./Logo.module.scss";
import logo from "../../assets/images/Logo.png";
import dashboardLogo from "../../assets/images/DashboardLogo.png";

interface LogoProps {
  dashboard?: boolean;
}

const Logo: React.FC<LogoProps> = ({ dashboard }) => {
  const logoSrc = dashboard ? dashboardLogo : logo;
  const logoClass = dashboard ? styles.dashboardLogo : styles.logo;
  return (
    <div>
      <img className={logoClass} src={logoSrc} alt="Logo" />
    </div>
  );
};

export default Logo;
