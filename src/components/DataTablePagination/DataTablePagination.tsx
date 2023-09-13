import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./DataTablePagination.module.scss";

interface DataTablePaginationProps {
  pageCount: number;
  handlePageChange: (selectedPage: { selected: number }) => void;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  pageCount,
  handlePageChange,
}) => (
  <ReactPaginate
    previousLabel={"← Prev"}
    nextLabel={"Next →"}
    breakLabel={"..."}
    pageCount={Math.ceil(pageCount)}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={handlePageChange}
    containerClassName={styles.pagination}
    previousLinkClassName={styles.pagination__link}
    nextLinkClassName={styles.pagination__link}
    disabledClassName={styles["pagination__link--disabled"]}
    activeClassName={styles["pagination__link--active"]}
  />
);

export default DataTablePagination;
