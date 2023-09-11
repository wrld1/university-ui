import React, { useState } from "react";
import DataRow from "../DataRow/DataRow";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import styles from "./DataTable.module.scss";
import { selectLectorPageData } from "../../redux/lectors/lectors.slice";
import { LectorPageData } from "../../types/Lector.interface";
import { selectPageType } from "../../redux/data/data.slice";
import { PageType } from "../../types/PageType.type";
import { selectCoursePageData } from "../../redux/courses/courses.slice";
import { CoursePageData } from "../../types/Course.interface";
import { GroupPageData } from "../../types/Group.interface";
import { StudentPageData } from "../../types/Student.interface";
import { selectGroupPageData } from "../../redux/groups/groups.slice";
import { selectStudentPageData } from "../../redux/students/students.slice";
import ReactPaginate from "react-paginate";

const DataTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageType: PageType = useAppSelector(selectPageType);

  type DataType =
    | LectorPageData[]
    | CoursePageData[]
    | GroupPageData[]
    | StudentPageData[];

  const dataMappings: Record<PageType, DataType> = {
    lectors: useAppSelector(selectLectorPageData),
    courses: useAppSelector(selectCoursePageData),
    groups: useAppSelector(selectGroupPageData),
    students: useAppSelector(selectStudentPageData),
  };

  const itemsPerPage = 10;
  const offset = currentPage * itemsPerPage;

  const dataForStyles: DataType = dataMappings[pageType] || [];

  const data: DataType =
    dataMappings[pageType]?.slice(offset, offset + itemsPerPage) || [];

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
        ...dataForStyles.map((row) => {
          const typedRow = row as LectorPageData | CoursePageData;
          return String(typedRow[header as keyof typeof typedRow]).length * 10;
        })
      );
      maxWidths[header] = Math.max(headerTextWidth, dataTextWidth);
      return maxWidths;
    },
    {} as Record<string, number>
  );

  const columnTemplate = headers
    .map((header) => `${columnMaxWidths[header]}px`)
    .join(" ");

  const columnStyles = {
    gridTemplateColumns: columnTemplate,
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
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={Math.ceil(dataMappings[pageType]?.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={styles.pagination}
          previousLinkClassName={styles.pagination__link}
          nextLinkClassName={styles.pagination__link}
          disabledClassName={styles["pagination__link--disabled"]}
          activeClassName={styles["pagination__link--active"]}
        />
      )}
    </>
  );
};

export default DataTable;
