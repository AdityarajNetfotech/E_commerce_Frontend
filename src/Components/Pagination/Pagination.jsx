import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="mt-4 flex flex-wrap items-center gap-4 justify-center">
            <button
                className="text-gray-500 flex items-center gap-2"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <span>Prev</span>
            </button>

            <div>
                Page {currentPage} of {totalPages}
            </div>

            <button
                className="text-gray-500 flex items-center gap-2"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
            >
                <span>Next</span>
            </button>
        </div>
    );
};

export default Pagination;
