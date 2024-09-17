import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchNoteById } from '../../services/api';
import getRandomColor from '../../components/notes/NoteColor';
import { format } from 'date-fns';

const NoteDetails = () => {
  const { id } = useParams();
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

  const [cardColor, setCardColor] = useState(getRandomColor());
  useEffect(() => {
    setCardColor(getRandomColor());
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='card card-body' style={{ backgroundColor: cardColor}}>
      {note ? (
        <div >
          <h2 >{note.title}</h2>
          <p >{note.body}</p>
          <p className="card-text">Created at: {format (new Date (note.createdAt), 'PPpp')}</p>
          <p className="card-text">Updated at: {format(new Date(note.updatedAt), 'PPpp')}</p>
        </div>
      ) : (
        <div>Note not found.</div>
      )}
    </div>
  );
};

export default NoteDetails;
