import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout/DashboardLayout";
import { selectCurrentAuthStatus } from "../../redux/auth/auth.slice";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { useEffect } from "react";

const LectorsPage: React.FC = () => {
  const isAuthenticated = useAppSelector(selectCurrentAuthStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
      return;
    }
  }, []);

  return <DashboardLayout heading="Lectors" />;
};

export default LectorsPage;
