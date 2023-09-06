import { apiCaller } from "../../utils/api-caller";
import { login, logOut } from "./auth.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import toast from "react-hot-toast";

export const useCheckAuthentication = () => {
  const dispatch = useAppDispatch();

  const checkAuthentication = async () => {
    try {
      const response = await apiCaller({
        method: "GET",
        url: "/auth/is-authenticated",
      });

      console.log("check auth is tut");

      if (response.status === 401) {
        toast.error(`You need to sign in again`);
        dispatch(logOut());
      } else if (response.status === 200) {
        dispatch(login({ isAuthenticated: response.data.authenticated }));
      } else {
        console.log("smth has happened and I don't know what");
      }
    } catch (error) {
      dispatch(logOut());
    }
  };

  return checkAuthentication;
};
