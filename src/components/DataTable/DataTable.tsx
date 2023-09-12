import React, { useMemo, useState } from "react";
import DataRow from "../DataRow/DataRow";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import styles from "./DataTable.module.scss";
import { LectorPageData } from "../../types/Lector.interface";
import { selectPageType } from "../../redux/data/data.slice";
import { PageType } from "../../types/PageType.type";
import { CoursePageData } from "../../types/Course.interface";
import { GroupPageData } from "../../types/Group.interface";
import { StudentPageData } from "../../types/Student.interface";
import { selectSearchValue } from "../../redux/search/search.slice";
import { useDataFilter } from "../../utils/hooks/useDataFilter";
import DataTablePagination from "../DataTablePagination/DataTablePagination";
import { useDataMappings } from "../../utils/hooks/useDataMappings";

type PageData =
  | LectorPageData
  | CoursePageData
  | GroupPageData
  | StudentPageData;

export type DataType = PageData[];

const DataTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageType: PageType = useAppSelector(selectPageType);
  const searchValue = useAppSelector(selectSearchValue);
  const memoizedSearchValue = useMemo(() => searchValue, [searchValue]);

  const dataMappings = useDataMappings();

  const filteredData = useDataFilter(
    dataMappings,
    memoizedSearchValue,
    pageType
  );

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;

  const data = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  if (data.length === 0) {
    return null;
  }

  const firstDataRow = data[0];
  const headers = Object.keys(firstDataRow);

  const maxPropertiesForReducedGap = 4;

  const numProperties = headers.length;
  const reducedGap = numProperties > maxPropertiesForReducedGap ? 100 : 200;

  const columnMaxWidths: Record<string, number> = headers.reduce(
    (maxWidths, header) => {
      const headerTextWidth = header.length * 10;
      const dataTextWidth = Math.max(
        ...(dataMappings[pageType]?.map((row) => {
          const typedRow = row as
            | LectorPageData
            | CoursePageData
            | GroupPageData
            | StudentPageData;
          const cellValue = String(typedRow[header as keyof typeof typedRow]);
          const cellWidth = cellValue.length * 10;
          return cellWidth;
        }) || [])
      );

      maxWidths[header] = Math.max(headerTextWidth, dataTextWidth);

      return maxWidths;
    },
    {} as Record<string, number>
  );

  const columnWidths: Record<string, string> = {};

  for (const header in columnMaxWidths) {
    columnWidths[header] = `${columnMaxWidths[header]}px`;
  }

  const columnStyles = {
    gridTemplateColumns: Object.values(columnWidths).join(" "),
    gridGap: `${reducedGap}px`,
  };

  return (
    <>
      <div className={styles["content__grid"]} style={columnStyles}>
        {headers.map((header) => (
          <div key={header} className={styles["content__column--name"]}>
            {header}
          </div>
        ))}
      </div>
      <div className={styles["content__rows--wrapper"]}>
        {data.map((row) => (
          <DataRow key={row.id} data={row} style={columnStyles} />
        ))}
      </div>
      {data.length > 0 && (
        <DataTablePagination
          pageCount={pageCount}
          handlePageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default DataTable;
