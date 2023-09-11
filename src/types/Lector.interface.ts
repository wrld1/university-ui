import { CourseApiResponse } from "./Course.interface";
import { Mark } from "./Mark.interface";

export interface LectorPageData {
  id: string;
  name: string | null;
  email: string;
  courses?: CourseApiResponse[] | null;
  marks: Mark[];
}

export interface LectorApiResponse extends LectorPageData {
  createdAt: Date;
  updatedAt: Date;
  password: string;
}
