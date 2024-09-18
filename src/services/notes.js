import { fetchNotes } from './api';

export const fetchNotesList = async (
     page, 
     pageSize, 
     setNotes, 
     setTotalPages, 
     setError,
) => {
     try {
     const fetchedNotes = await fetchNotes(page, pageSize);
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

