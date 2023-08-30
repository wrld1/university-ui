import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getUsersApi = async (): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/users/me",
  });

export const signIn = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "post",
    url: "/auth/sign-in",
    data: data,
  });

export const signUp = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "post",
    url: "/auth/sign-up",
    data: data,
  });
