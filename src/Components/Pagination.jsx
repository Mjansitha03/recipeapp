import React from "react";

// Reusable pagination for all pages
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center gap-3 mt-6">
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md border font-medium ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        Prev
      </button>

      {/* Number Buttons */}
      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1)
          .slice(
            Math.max(0, currentPage - 3),
            Math.min(totalPages, currentPage + 2)
          )
          .map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded-md border font-medium ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "bg-white hover:bg-orange-100"
              }`}
            >
              {page}
            </button>
          ))}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md border font-medium ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
