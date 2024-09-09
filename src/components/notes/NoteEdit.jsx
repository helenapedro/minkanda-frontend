import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateNoteAsync, fetchNotesAsync } from '../../redux/notesSlice';

const NoteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);
  const loading = useSelector((state) => state.notes.loading);
  const error = useSelector((state) => state.notes.error);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (!loading && notes.length === 0) {
      dispatch(fetchNotesAsync()).unwrap().catch(() => {
        setLocalError('Failed to fetch notes.');
      });
    }
  }, [loading, notes.length, dispatch]);

  useEffect(() => {
    if (!loading) {
      console.log('Notes:', notes); // Debugging line
      const note = notes.find((note) => note.nid === parseInt(id, 10));
      if (note) {
        setTitle(note.title);
        setBody(note.body);
      } else {
        setLocalError('Note not found.');
      }
    }
  }, [loading, notes, id]);

  const handleSave = () => {
    dispatch(updateNoteAsync({ nid: parseInt(id, 10), note: { title, body } }))
      .then(() => {
        navigate(`/notes/${id}`);
      })
      .catch((err) => {
        setLocalError('Failed to update note.');
        console.error(err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (localError) {
    return <div>{localError}</div>;
  }

  return (
    <div>
      <h2>Edit Note</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Body:</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NoteEdit;