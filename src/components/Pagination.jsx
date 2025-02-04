import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
const Pagination = ({itemsPerPage, setItemsPerPage, currentPage, setCurrentPage, totalItems}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  return (
    <div className="flex justify-between items-center">
    <div className="flex items-center gap-2">
      <span>Items per page:</span>
      <select 
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="border rounded px-2 py-1"
      >
        {[5, 10, 25, 50, 100].map(value => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
    </div>
    <div className="flex items-center gap-4">
      <span>{currentPage * itemsPerPage - itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}</span>
      <div className="flex gap-2">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button 
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
  )
}

export default Pagination
