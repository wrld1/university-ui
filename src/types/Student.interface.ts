import { Mark } from "./Mark.interface";
import { GroupApiResponse } from "./Group.interface";

export interface StudentPageData {
  id: string;
  name: string;
  surname: string;
  email: string;
  age: number;
  group: GroupApiResponse | null;
}

export interface StudentApiResponse extends StudentPageData {
  createdAt: Date;
  updatedAt: Date;
  marks: Mark[];
  imagePath: string | null;
  groupId: number | null;
}
