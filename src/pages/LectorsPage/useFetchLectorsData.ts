import { useCallback, useMemo } from "react";
import { setLoading, setPageType } from "../../redux/data/data.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import toast from "react-hot-toast";
import {
  LectorApiResponse,
  LectorPageData,
} from "../../types/Lector.interface";
import {
  setLectorApiData,
  setLectorPageData,
} from "../../redux/lectors/lectors.slice";

function useFetchLectorsData(apiFunction: any) {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await apiFunction();

      const transformedData: LectorPageData[] = response.data.map(
        (item: LectorApiResponse) => {
          const { password, createdAt, updatedAt, name, courses, ...rest } =
            item;
          const formattedName = name || "No Name";
          const formattedCourses = courses?.length ? courses : "No courses";
          return { ...rest, name: formattedName, courses: formattedCourses };
        }
      );

      dispatch(setLectorApiData(response.data));
      dispatch(setLectorPageData(transformedData));
      dispatch(setPageType("lectors"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [apiFunction, dispatch]);

  const memoizedFetchData = useMemo(() => fetchData, [fetchData]);

  return memoizedFetchData;
}

export default useFetchLectorsData;
