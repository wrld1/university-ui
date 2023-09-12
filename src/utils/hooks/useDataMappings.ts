import { useMemo } from "react";
import { selectStudentPageData } from "../../redux/students/students.slice";
import { useAppSelector } from "./useAppSelector";
import { selectGroupPageData } from "../../redux/groups/groups.slice";
import { selectCoursePageData } from "../../redux/courses/courses.slice";
import { selectLectorPageData } from "../../redux/lectors/lectors.slice";

export function useDataMappings() {
  const lectors = useAppSelector(selectLectorPageData);
  const courses = useAppSelector(selectCoursePageData);
  const groups = useAppSelector(selectGroupPageData);
  const students = useAppSelector(selectStudentPageData);

  return useMemo(() => {
    return {
      lectors,
      courses,
      groups,
      students,
    };
  }, [lectors, courses, groups, students]);
}
