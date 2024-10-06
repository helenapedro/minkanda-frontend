import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {fetchNoteByIdAsync, updateNoteAsync, toggleNotePrivacyAsync, resetUpdateStatus } from '../../redux/notesSlice';

const NoteEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

   // State for handling form inputs
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redux selectors for note data and update status
  const note = useSelector((state) => state.notes.selectedNote);
  const error = useSelector((state) => state.notes.error);
  const updateNoteStatus = useSelector((state) => state.notes.updateNoteStatus);
  const successMessage = useSelector((state) => state.notes.successMessage);

  // Handle API call status updates
  useEffect(() => {
    if (updateNoteStatus === 'fulfilled') {
      alert('Note updated successfully!');
      setTimeout(() => {
        navigate('/notes'); 
        dispatch(resetUpdateStatus());
      }, 2000)
    }
  }, [updateNoteStatus, navigate, dispatch]);

  // Fetch the note when component loads
  useEffect(() => {
    if (id) {
      dispatch(fetchNoteByIdAsync(id));
    }
  }, [dispatch, id]);

  // Populate fields when note is loaded
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setIsPublic(note.isPublic)
    }
  }, [note]);
  
  const handleSave = async () => {
    if (!note) return;

    const updatedNote = {
      nid: note.nid,
      title,
      body,
      isPublic
    };

    setIsLoading(true);

     try {
      await dispatch(updateNoteAsync(updatedNote)).unwrap(); 
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false); 
      console.error('Oops! Something went wrong on our end. Please try again later.', error);
    }
  };
  
  const handleTogglePrivacy = async () => {
    if (!note) return;

    setIsLoading(true);

    try {
      await dispatch(toggleNotePrivacyAsync(note.nid)).unwrap();
      setIsPublic((prev) => !prev);
      setIsLoading(false); 
    } catch (error) {
      setIsLoading(false);
      console.error('Error toggling privacy:', error);
    }
  };

  return (
    <div>
      <h2>Edit Note</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">Body</label>
        <textarea
          className="form-control"
          id="body"
          rows="3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>

      <button onClick={handleTogglePrivacy} className="btn btn-secondary" disabled={isLoading}>
        {isPublic ? 'Make Private' : 'Make Public'}
      </button>
      
      <button className="btn btn-primary" onClick={handleSave} disabled={isLoading || !note}>
        {isLoading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
};

export default NoteEdit;