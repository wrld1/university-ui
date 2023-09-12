import { DataType } from "../../components/DataTable/DataTable";
import { PageType } from "../../types/PageType.type";

export function useDataFilter(
  dataMappings: Record<PageType, DataType>,
  searchValue: string,
  pageType: PageType
): DataType {
  const data = dataMappings[pageType] || [];

  if (!searchValue) {
    return data;
  }

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchValue.toLowerCase())
    )
  );

  return filteredData;
}
