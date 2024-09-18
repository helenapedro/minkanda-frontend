export const fetchNotesData = async (
     fetchFunction,  // This will be a function to fetch either public or private notes
     page, 
     pageSize, 
     setNotes, 
     setTotalPages, 
     setError
   ) => {
     try {
       const fetchedNotes = await fetchFunction(page, pageSize);
   
       if (fetchedNotes && fetchedNotes.content) {
         setNotes(fetchedNotes.content);
         setTotalPages(fetchedNotes.totalPages);
       } else {
         throw new Error('Unexpected API response format');
       }
     } catch (err) {
       setError('Failed to fetch notes.');
       console.error(err);
     }
   };
   