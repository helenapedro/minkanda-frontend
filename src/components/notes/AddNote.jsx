import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNoteAsync } from '../../redux/notesSlice';

const AddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = () => {
    dispatch(
      addNoteAsync({
        title,
        body,
        public: isPublic
      })
    ).then(() => {
      setTitle('');
      setBody('');
      setIsPublic(false);
      navigate('/notes');
    });
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
