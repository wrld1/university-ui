import { apiCaller } from "../../utils/api-caller";
import { logOut, setIsAuthenticated } from "./auth.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";

export const useCheckAuthentication = () => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    try {
      const response = await apiCaller({
        method: "GET",
        url: "/auth/authenticated",
      });

      if (response.status === 401) {
        dispatch(logOut());
      } else if (response.status === 200) {
        dispatch(setIsAuthenticated({ isAuthenticated: true }));
      } else {
        console.log("smth has happened and I don't know what");
      }
    } catch (error) {
      dispatch(logOut());
    }
  };

  return checkAuthentication;
};
