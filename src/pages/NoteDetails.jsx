import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNoteById } from '../services/api';

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNoteDetails = async () => {
      try {
        const fetchedNote = await fetchNoteById(id); // Correct function usage
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {note ? (
        <div>
          <h2>{note.title}</h2>
          <p>{note.body}</p>
        </div>
      ) : (
        <div>Note not found.</div>
      )}
    </div>
  );
};

export default NoteDetails;
