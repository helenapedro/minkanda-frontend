import React from 'react';
import paginationStyles from '../../styles/pagination.module.css';

const PaginationLayout = ({ 
  page, totalPages, 
  handlePreviousPage, handleNextPage, 
  pageSize, handlePageSizeChange 
}) => {
  return (
    <div>
      <div className={paginationStyles.pagination}>
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
      <div className="pagination-controls mb-3">
        <label htmlFor="pageSize" className="me-2">Notes per page:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>
      <div className="pagination-info">
        <span>Showing {pageSize} notes per page</span>
      </div>
    </div>
  );
};

export default PaginationLayout;