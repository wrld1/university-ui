import styles from "./Aside.module.scss";
import { ReactComponent as LogoutIcon } from "../../../../assets/icons/LogoutIcon.svg";
import { useAppDispatch } from "../../../../utils/hooks/useAppDispatch";
import { logOut } from "../../../../redux/auth/auth.slice";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());

    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className={styles["dashboard__aside--logout"]} onClick={handleLogout}>
      {<LogoutIcon />}
      <p>Log Out</p>
    </div>
  );
};

export default Logout;
