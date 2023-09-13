import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { selectCurrentAuthStatus } from "../../redux/auth/auth.slice";
import { useCheckAuthentication } from "../../redux/auth/auth.actions";

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const isAuthenticated = useAppSelector(selectCurrentAuthStatus);
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPathname = location.pathname;

  const fetchAuth = async () => {
    await checkAuthentication();
  };

  useEffect(() => {
    fetchAuth();

    if (!isAuthenticated) {
      // toast.error("You need to authorize first to access this page!");
      navigate("/sign-in");
      return;
    }

    //eslint-disable-next-line
  }, [currentPathname]);

  return <>{children}</>;
};

export default AuthWrapper;
