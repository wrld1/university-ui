import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getStudents = async (): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/students",
  });

export const createStudent = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/students",
    data: data,
  });

export const editStudent = async (
  id: string,
  data: any
): Promise<AxiosResponse> =>
  apiCaller({
    method: "PUT",
    url: `/students/${id}`,
    data: data,
  });
