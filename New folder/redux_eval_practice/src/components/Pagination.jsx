import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    const pageNumbers = [];
    pageNumbers.push(1);
    
    if (currentPage > 3) {
      pageNumbers.push('...');
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pageNumbers.includes(i) && i > 1 && i < totalPages) {
        pageNumbers.push(i);
      }
    }
    
    if (currentPage < totalPages - 2) {
      pageNumbers.push('...');
    }
    
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center mt-6 space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 
                 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                 hover:bg-gray-50 transition-colors duration-150"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      
      {getPageNumbers().map((number, index) => (
        typeof number === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChange(number)}
            className={`px-3 py-2 rounded-md transition-colors duration-150 
                      ${currentPage === number 
                        ? 'bg-green-500 text-white font-medium' 
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
          >
            {number}
          </button>
        ) : (
          <span key={index} className="px-2 text-gray-500">
            {number}
          </span>
        )
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 
                 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed
                 hover:bg-gray-50 transition-colors duration-150"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default Pagination;