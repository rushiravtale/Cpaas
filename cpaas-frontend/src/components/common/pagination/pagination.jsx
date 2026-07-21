import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./paginationStyles.scss";

const Pagination = ({
  rowsPerPage,
  rowCount,
  onChangePage,
  onChangeRowsPerPage,
  currentPage,
  displayRowsPerPage,
  extraStyle,
}) => {
  const numberOfPages = Math.ceil(rowCount / rowsPerPage);

  const handlePrevious = useCallback(
    () => currentPage > 1 && onChangePage(currentPage - 1),
    [currentPage, onChangePage]
  );

  const handleNext = useCallback(
    () => currentPage < numberOfPages && onChangePage(currentPage + 1),
    [currentPage, numberOfPages, onChangePage]
  );

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, rowCount);


  const generatePageNumbers = () => {
    const pages = [];

    const first = 1;
    const last = numberOfPages;

    pages.push(first);

    if (currentPage > first + 2) {
      pages.push("...");
    } else if (currentPage === 3) {
      pages.push(2);
    }

    if (currentPage !== first && currentPage !== last) {
      pages.push(currentPage);
    }

    if (currentPage < last - 2) {
      pages.push("...");
    } else if (currentPage === last - 2) {
      pages.push(last - 1);
    }

    if (last !== first) {
      pages.push(last);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();


  return (
    <div className="pagination-wrapper" style={extraStyle}>
      <div className="rows-info">
        {displayRowsPerPage && <div className="rows-select">{displayRowsPerPage}</div>}
        <span className="rows-text">
          Showing {startRow} to {endRow} of {rowCount} entries
        </span>
      </div>

      <div className="pagination-buttons">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="nav-button"
        >
          <AiOutlineArrowLeft />
        </button>

        {pageNumbers.map((p, index) =>
          p === "..." ? (
            <span key={`dots-${index}`} className="dots">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChangePage(p)}
              className={currentPage === p ? "active" : ""}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === numberOfPages}
          className="nav-button"
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  displayRowsPerPage: PropTypes.node,
  extraStyle: PropTypes.object,
};

export default Pagination;
