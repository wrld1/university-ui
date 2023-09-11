import { LectorApiResponse } from "./Lector.interface";
import { Mark } from "./Mark.interface";

export interface CoursePageData {
  id: string;
  name: string;
  description: string;
  hours: number;
}

export interface CourseApiResponse extends CoursePageData {
  lectors?: LectorApiResponse[] | null;
  marks: Mark[];
  createdAt: Date;
  updatedAt: Date;
}
