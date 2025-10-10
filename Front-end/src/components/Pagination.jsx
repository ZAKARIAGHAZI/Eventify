import React from "react";

const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-12 flex items-center justify-center space-x-2">
      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {pages.map((p) => (
        <button
          key={p}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium ${
            p === currentPage
              ? "bg-primary text-white font-bold"
              : "hover:bg-black/5 dark:hover:bg-white/5"
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;
