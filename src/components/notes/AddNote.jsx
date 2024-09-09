import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNoteAsync } from '../../redux/notesSlice';
import { useNavigate } from 'react-router-dom';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await dispatch(addNoteAsync({ title, body })).unwrap();
      navigate('/notes');
    } catch (err) {
      setError('Failed to add note.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Add Note</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Body</label>
          <textarea
            id="body"
            className="form-control"
            rows="5"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;
