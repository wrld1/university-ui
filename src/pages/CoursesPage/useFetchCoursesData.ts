import { useCallback, useMemo } from "react";
import { setLoading, setPageType } from "../../redux/data/data.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import toast from "react-hot-toast";
import {
  CourseApiResponse,
  CoursePageData,
} from "../../types/Course.interface";
import {
  setCourseApiData,
  setCoursePageData,
} from "../../redux/courses/courses.slice";

function useFetchCoursesData(apiFunction: any) {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await apiFunction();

      const transformedData: CoursePageData[] = response.data.map(
        (item: CourseApiResponse) => {
          const { createdAt, updatedAt, lectors, marks, ...rest } = item;
          const formattedLectors = lectors?.length ? lectors : "No lectors";
          return { ...rest, lectors: formattedLectors };
        }
      );

      dispatch(setCourseApiData(response.data));
      dispatch(setCoursePageData(transformedData));
      dispatch(setPageType("courses"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [apiFunction, dispatch]);

  const memoizedFetchData = useMemo(() => fetchData, [fetchData]);

  return memoizedFetchData;
}

export default useFetchCoursesData;
