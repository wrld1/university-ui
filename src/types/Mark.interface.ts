import { CourseApiResponse } from "./Course.interface";
import { StudentApiResponse } from "./Student.interface";
import { LectorApiResponse } from "./Lector.interface";

export interface Mark {
  id: string;
  mark: number;
  student: StudentApiResponse;
  lector: LectorApiResponse;
  course: CourseApiResponse;
  createdAt: Date;
  updatedAt: Date;
}
