import { useCallback, useMemo } from "react";
import { setLoading, setPageType } from "../../redux/data/data.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import toast from "react-hot-toast";
import {
  setStudentApiData,
  setStudentPageData,
} from "../../redux/students/students.slice";
import {
  StudentApiResponse,
  StudentPageData,
} from "../../types/Student.interface";

function useFetchStudentsData(apiFunction: any) {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await apiFunction();

      const transformedData: StudentPageData[] = response.data.map(
        (item: StudentApiResponse) => {
          const {
            createdAt,
            updatedAt,
            imagePath,
            groupId,
            marks,
            group,
            ...rest
          } = item;

          const formattedGroup = group || "No Group";
          return { ...rest, group: formattedGroup };
        }
      );

      dispatch(setStudentApiData(response.data));
      dispatch(setStudentPageData(transformedData));
      dispatch(setPageType("students"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [apiFunction, dispatch]);

  const memoizedFetchData = useMemo(() => fetchData, [fetchData]);

  return memoizedFetchData;
}

export default useFetchStudentsData;
