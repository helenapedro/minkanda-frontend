import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNoteAsync } from '../redux/notesSlice';
import { useNavigate } from 'react-router-dom';

const NoteCard = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteNoteAsync(note.id));
  };

  const handleView = () => {
    navigate(`/notes/${note.id}`);
  };

  const handleEdit = () => {
    navigate(`/notes/edit/${note.id}`);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.body}</p>
        <button className="btn btn-primary" onClick={handleView}>View</button>
        <button className="btn btn-warning mx-2" onClick={handleEdit}>Edit</button>
        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default NoteCard;
