import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import { selectCurrentAuthStatus } from "../../redux/auth/auth.slice";
import { useCheckAuthentication } from "../../redux/auth/auth.actions";

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  console.log("wrapper rendered");
  const isAuthenticated = useAppSelector(selectCurrentAuthStatus);
  const checkAuthentication = useCheckAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPathname = location.pathname;

  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuthentication();
    };

    fetchAuth();
    if (!isAuthenticated) {
      toast.error("You need to authorize first to access this page!");
      navigate("/sign-in");
      console.log("Navigating to /sign-in");
      return;
    }
    //eslint-disable-next-line
  }, [isAuthenticated, currentPathname]);

  return <>{children}</>;
};

export default AuthWrapper;
