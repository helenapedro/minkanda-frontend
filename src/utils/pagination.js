export const getPaginationControls = (page, totalPages, setPage) => ({
     handleNextPage: () => {
          if (page < totalPages - 1) {
            setPage((prevPage) => prevPage + 1);
          }
     },
      
     handlePreviousPage: () => {
          if (page > 0) {
            setPage((prevPage) => prevPage - 1);
          }
     }
});