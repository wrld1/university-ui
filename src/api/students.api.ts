import { apiCaller } from "../utils/api-caller";
import { AxiosResponse } from "axios";

export const getStudents = async (
  sortField?: string,
  sortOrder?: string
): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: "/students",
    params: {
      sortField,
      sortOrder,
    },
  });

export const getStudentById = async (id: string): Promise<AxiosResponse> =>
  apiCaller({
    method: "GET",
    url: `/students/${id}`,
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

export const addGroupToStudent = async (
  id: string,
  data: any
): Promise<AxiosResponse> =>
  apiCaller({
    method: "PUT",
    url: `/students/${id}/add-group`,
    data: data,
  });
