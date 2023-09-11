import { StudentApiResponse } from "./Student.interface";

export interface GroupPageData {
  id: string;
  name: string;
  students: StudentApiResponse[];
}

export interface GroupApiResponse extends GroupPageData {
  createdAt: Date;
  updatedAt: Date;
}
