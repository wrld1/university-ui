import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getUsersApi = async (): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/lectors/me",
  });

export const signIn = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/auth/sign-in",
    data: data,
  });

export const signUp = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/auth/sign-up",
    data: data,
  });

export const resetPassRequest = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/auth/reset-password-request",
    data: data,
  });

export const resetPass = async (
  data: any,
  token: string,
  id: string
): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: `/auth/reset-password?token=${token}&id=${id}`,
    data: data,
  });
