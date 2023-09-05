import { apiCaller } from "../../utils/api-caller";
import { login, logOut } from "./auth.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";

export const checkAuthentication = () => async () => {
  const dispatch = useAppDispatch();
  try {
    const response = await apiCaller({
      method: "GET",
      url: "/api/is-authenticated",
    });

    if (response.status === 401) {
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
