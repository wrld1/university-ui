import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getLectors = async (): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/lectors",
  });

export const createLector = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/lectors",
    data: data,
  });

export const editLector = async (
  id: string,
  data: any
): Promise<AxiosResponse> =>
  apiCaller({
    method: "PUT",
    url: `/lectors/${id}`,
    data: data,
  });
