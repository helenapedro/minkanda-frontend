import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import { fetchNoteByIdAsync, updateNoteAsync } from '../../redux/notesSlice';

const NoteEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const note = useSelector((state) => state.notes.selectedNote);
  const error = useSelector(state => state.notes.error) 

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const updateNoteStatus = useSelector(state => state.notes.updateNoteStatus);

  useEffect(() => {
    if (updateNoteStatus === 'fulfilled') {
      navigate('/notes'); 
      dispatch({ type: 'notes/resetUpdateStatus' });
    }
  }, [updateNoteStatus, navigate, dispatch]);
 
  useEffect(() => {
    if (id) {
      dispatch(fetchNoteByIdAsync(id)); 
    }

    return () => {
      dispatch({ type: 'notes/clearError' });
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (note) {
      console.log('Received note data:', note);
      setTitle(note.title);
      setBody(note.body);

      dispatch({ type: 'notes/clearError' }); 
    }
  }, [note]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'notes/clearSelectedNote' });
    };
  }, [dispatch]);
  


  const handleSave = () => {
    if (!note) return;

    const updateNote = {
      ...note,
      title,
      body,
    };

    dispatch(updateNoteAsync({ nid: note.nid, ...updateNote }));
  };

  return (
    <div>
      <h2>Edit Note</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"   

          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="body" className="form-label">
          Body
        </label>
        <textarea
          className="form-control"
          id="body"
          rows="3"
          value={body}
          onChange={(e) => setBody(e.target.value)}   

        />
      </div>
      <button className="btn btn-primary" onClick={handleSave} disabled={!note}> 
        Save
      </button>
    </div>
  );
};

export default NoteEdit;