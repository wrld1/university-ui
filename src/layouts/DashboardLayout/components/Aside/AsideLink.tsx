import styles from "../Aside/Aside.module.scss";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as DashboardIcon } from "../../../../assets/icons/DashboardIcon.svg";
import { ReactComponent as LectorsIcon } from "../../../../assets/icons/LectorsIcon.svg";
import { ReactComponent as GroupsIcon } from "../../../../assets/icons/GroupsIcon.svg";
import { ReactComponent as StudentsIcon } from "../../../../assets/icons/StudentsIcon.svg";
import { ReactComponent as CoursesIcon } from "../../../../assets/icons/CoursesIcon.svg";

type Name = "Dashboard" | "Lectors" | "Groups" | "Students" | "Courses";

const iconComponents = {
  Dashboard: DashboardIcon,
  Courses: CoursesIcon,
  Lectors: LectorsIcon,
  Groups: GroupsIcon,
  Students: StudentsIcon,
};

interface AsideLinkProps {
  name: Name;
}

const AsideLink: React.FC<AsideLinkProps> = ({ name }) => {
  const Icon = iconComponents[name];

  const location = useLocation();

  const isActive = location.pathname === `/${name.toLowerCase()}`;

  const wrapperClasses = classNames(styles["aside__link-wrapper"], {
    [styles.active]: isActive,
  });

  return (
    <Link to={`/${name.toLowerCase()}`} className={wrapperClasses}>
      <div className={styles.aside__link}>
        <div className={styles.icon__block}>{<Icon />}</div>
        <span>{name}</span>
      </div>
    </Link>
  );
};

export default AsideLink;
