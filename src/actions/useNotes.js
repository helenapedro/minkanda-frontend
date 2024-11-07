import { useEffect, useState } from 'react';
import { fetchNotesList, fetchPublicNotesList } from '../services/notes';

const useNotes = (isPublic = false) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const fetchFunction = isPublic ? fetchPublicNotesList : fetchNotesList;
        await fetchFunction(page, pageSize, setNotes, setTotalPages, setError);
      } catch (err) {
        setError('Failed to fetch notes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, [page, pageSize, isPublic]);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(0); 
  };

  return { notes, loading, error, page, setPage, totalPages, pageSize, handlePageSizeChange };
};

export default useNotes;
