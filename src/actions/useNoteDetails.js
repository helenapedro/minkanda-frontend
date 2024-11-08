import { useEffect, useState } from 'react';
import { fetchNoteById } from '../services/api';

const useNoteDetails = (id) => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNoteDetails = async () => {
      try {
        const fetchedNote = await fetchNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        setError('Failed to fetch note details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNoteDetails();
  }, [id]);

  return { note, loading, error };
};

export default useNoteDetails;
