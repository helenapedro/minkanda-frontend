import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNoteAsync, toggleNotePrivacyAsync } from '../../redux/notesSlice';

const AddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async () => {
    try {
      const note = await dispatch(
        addNoteAsync({
          title,
          body,
        })
      ).unwrap(); 

      if (isPublic) {
        await dispatch(toggleNotePrivacyAsync(note.nid)).unwrap();
      }

      setTitle('');
      setBody('');
      setIsPublic(false);
      navigate('/notes');
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <div>
      <h2>Add New Note</h2>
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
      <div className="mb-3">
        <label htmlFor="public" className="form-label">
          <input
            type="checkbox"
            id="public"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
          Public
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default AddNote;
