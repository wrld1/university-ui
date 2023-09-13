import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getGroups = async (): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/groups",
  });

export const getGroupById = async (id: string): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: `/groups/${id}`,
  });

export const createGroup = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/groups",
    data: data,
  });

export const editGroup = async (
  id: string,
  data: any
): Promise<AxiosResponse> =>
  apiCaller({
    method: "PUT",
    url: `/groups/${id}`,
    data: data,
  });
