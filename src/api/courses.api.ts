import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getCourses = async (): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/courses",
  });

export const createCourse = async (data: any): Promise<AxiosResponse> =>
  apiCaller({
    method: "POST",
    url: "/courses",
    data: data,
  });

export const editCourse = async (
  id: string,
  data: any
): Promise<AxiosResponse> =>
  apiCaller({
    method: "PUT",
    url: `/courses/${id}`,
    data: data,
  });
