import React from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";
import { IoIosArrowRoundUp } from "react-icons/io";

import "./dataTable.scss";
import Pagination from "../pagination/pagination";

const CustomDataTable = ({
  title,
  columns,
  data,
  paginationPerPage = 10,
  currentPage = 1,
  paginationTotalRows,
  onChangePage,
  onChangeRowsPerPage,
  displayRowsPerPage,
  extraStyles,
  extraStylesForTable,
  ...props
}) => {
  const PaginationComponent = () => (
    <Pagination
      rowsPerPage={paginationPerPage}
      rowCount={paginationTotalRows}
      currentPage={currentPage}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      displayRowsPerPage={displayRowsPerPage}
      paginationComponent={Pagination}
    />
  );

  const maxVisibleRows = 5;
  const shouldScroll = data?.length > maxVisibleRows;

  return (
    <div className={`data-table-wrapper ${extraStyles || ""}`}>
      {title && <h3 className="data-table-title">{title}</h3>}

      <DataTable
        columns={columns}
        data={data}
        sortIcon={<IoIosArrowRoundUp />}
        pagination
        paginationServer
        paginationComponent={PaginationComponent}
        className={extraStylesForTable || ""}
        fixedHeader={shouldScroll}
        fixedHeaderScrollHeight={shouldScroll ? "300px" : "auto"}
        {...props}
      />
    </div>
  );
};

CustomDataTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  paginationPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  paginationTotalRows: PropTypes.number,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func,
  displayRowsPerPage: PropTypes.node,
};

export default CustomDataTable;
