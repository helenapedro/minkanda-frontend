import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../../services/api'; 
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1); 

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const fetchedNotes = await fetchNotes();
        console.log('Fetched Notes:', fetchedNotes);
        setNotes(fetchedNotes);

        if (Array.isArray(fetchedNotes)) {
          setNotes(fetchedNotes);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        setError('Failed to fetch notes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage((prevPage) => prevPage + 1); 
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage((prevPage) => prevPage - 1); 
  };

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteDetailsCard key={note.nid} note={note} />
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>Previous</button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
      </div>
    </div> 
  );
};

export default NotesList;
