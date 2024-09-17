import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoteByIdAsync, updateNoteAsync } from '../../redux/notesSlice';

const NoteEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const note = useSelector((state) =>
    state.notes.selectedNote
  );

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const updateNoteStatus = useSelector(state => state.notes.updateNoteStatus);
 
  useEffect(() => {
    if (id) {
      dispatch(fetchNoteByIdAsync(id)); 
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
    }
  }, [note]);

  useEffect(() => {
    if (updateNoteStatus === 'fulfilled') {
      navigate('/notes'); 
    }
  }, [updateNoteStatus, navigate]);

  const handleSave = () => {
    const { nid, ...restOfNote } = note; 

    dispatch(updateNoteAsync({ nid, ...restOfNote }));
  };

  return (
    <div>
      <h2>Edit Note</h2>
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
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default NoteEdit;