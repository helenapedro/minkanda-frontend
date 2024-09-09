import React, { useEffect, useState } from 'react';
import { fetchNotes } from '../../services/api'; 
import NoteCard from '../../components/notes/NoteCard';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const fetchedNotes = await fetchNotes();
        console.log('Fetched Notes:', fetchedNotes);
        setNotes(fetchedNotes);
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

  return (
    <div className="notes-list">
      {notes.map((note) => (
        <NoteCard key={note.nid} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
