import { useCallback, useMemo } from "react";
import { setLoading, setPageType } from "../../redux/data/data.slice";
import {
  setGroupApiData,
  setGroupPageData,
} from "../../redux/groups/groups.slice";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import toast from "react-hot-toast";
import { GroupApiResponse, GroupPageData } from "../../types/Group.interface";

function useFetchGroupsData(apiFunction: any) {
  const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await apiFunction();

      const transformedData: GroupPageData[] = response.data.map(
        (item: GroupApiResponse) => {
          const { createdAt, updatedAt, students, ...rest } = item;
          const formattedStudents = students?.length ? students : "No students";
          return { ...rest, students: formattedStudents };
        }
      );

      dispatch(setGroupApiData(response.data));
      dispatch(setGroupPageData(transformedData));
      dispatch(setPageType("groups"));
      dispatch(setLoading(false));
    } catch (error: any) {
      toast.error(`There is an error: ${error.response.data.message}`);
    }
  }, [apiFunction, dispatch]);

  const memoizedFetchData = useMemo(() => fetchData, [fetchData]);

  return memoizedFetchData;
}

export default useFetchGroupsData;
