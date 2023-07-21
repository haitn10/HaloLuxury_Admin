import React from "react";
import classnames from "classnames";
import { usePagination, DOTS } from "./usePagination";
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <nav className=" flex justify-center pt-6">
      <ul className="flex">
        <li>
          <button
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-100 disabled:opacity-25 disabled:hover:bg-transparent"
            onClick={onPrevious}
            disabled={currentPage === 1}
            aria-label="Previous"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          // If the pageItem is a DOT, render the DOTS unicode character
          if (pageNumber === DOTS) {
            return (
              <li
                key={index}
                className={classnames(
                  "mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-50-300"
                )}
              >
                &#8230;
              </li>
            );
          }

          // Render our Page Pills
          return (
            <li
              key={index}
              className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-blue-gray-100 cursor-pointer selection:bg-blue-gray-300"
              // onSelect={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li>
          <button
            className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-gray-100 disabled:opacity-25 disabled:hover:bg-transparent"
            onClick={onNext}
            disabled={currentPage === lastPage}
            aria-label="Next"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
