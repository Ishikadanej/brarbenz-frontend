"use client";
import React, { useMemo } from "react";

const Pagination = ({
  total = 0,
  page = 1,
  perPage = 10,
  onPageChange,
  className = "",
}) => {
  const safePerPage = Math.max(1, perPage);
  const pageCount = Math.ceil(total / safePerPage);

  if (pageCount <= 1) return null;

  const pageNums = useMemo(() => {
    const range = [];
    const leftSideCount = Math.min(page - 1, 1);
    const rightSideCount = Math.min(pageCount - page, 1);

    range.push(1);

    if (page > 3) range.push("...");

    for (let i = page - leftSideCount; i < page; i++) {
      if (i > 1) range.push(i);
    }

    if (page !== 1) range.push(page);

    for (let i = page + 1; i <= page + rightSideCount; i++) {
      if (i < pageCount) range.push(i);
    }

    if (page < pageCount - 2) range.push("...");

    if (pageCount > 1 && pageCount !== page) range.push(pageCount);

    return range;
  }, [page, pageCount]);

  const handlePageChange = (newPage) => {
    if (newPage !== page && newPage !== "..." && onPageChange) {
      onPageChange(newPage);
    }
  };

  return (
    <div className={`d-flex mt-5 justify-content-between w-100 ${className}`}>
      {page > 1 ? (
        <button
          onClick={() => handlePageChange(page - 1)}
          className="btn btn-link d-flex align-items-center gap-2 text-dark"
        >
          <i className="fa-solid fa-angle-left"></i>
          <span className="d-none d-sm-inline">Prev</span>
        </button>
      ) : (
        <div />
      )}

      <ul className="pagination mb-0 gap-2">
        {pageNums.map((number, index) =>
          number === "..." ? (
            <li
              key={index}
              className="page-item disabled d-flex justify-content-center align-items-center"
            >
              <span className="px-2">...</span>
            </li>
          ) : (
            <li
              key={index}
              className={`page-item ${page === number ? "active" : ""}`}
            >
              <button
                onClick={() => handlePageChange(number)}
                className="page-link"
                disabled={page === number}
              >
                {number}
              </button>
            </li>
          )
        )}
      </ul>

      {page < pageCount ? (
        <button
          onClick={() => handlePageChange(page + 1)}
          className="btn btn-link d-flex align-items-center gap-2 text-dark"
        >
          <span className="d-none d-sm-inline">Next</span>
          <i className="fa-solid fa-angle-right"></i>
        </button>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Pagination;
