import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { deleteNoteAsync } from '../../redux/notesSlice';
import { useNavigate } from 'react-router-dom';

import getRandomColor from './NoteColor';
import { fetchNotesAsync } from '../../redux/notesSlice';

const NoteDetailsCard = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteStatus, setDeleteStatus] = useState(null); 

  const [cardColor, setCardColor] = useState(getRandomColor());
  useEffect(() => {
    setCardColor(getRandomColor());
  }, [note]);

  const handleView = () => {
    navigate(`/notes/${note.nid}`);
  };

  const handleEdit = () => {
    console.log('Navigating to:', `/notes/edit/${note.nid}`);
    navigate(`/notes/edit/${note.nid}`);
  };

  const handleDelete = async () => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if (!confirmed) {
        return;
      }
  
      dispatch(deleteNoteAsync(note.nid));
  
      setDeleteStatus('Note successfully deleted.');

      dispatch(fetchNotesAsync());
    } catch (error) {
      setDeleteStatus('Error deleting note.');
    }
  };
  
  return (
      <div className="card mb-3" style={{ backgroundColor: cardColor}}>
        <div className='card-body'>
          <h5 className="card-title">{note.title}</h5>
          <button className="btn btn-primary" onClick={handleView}>View</button>
          <button className="btn btn-warning mx-2" onClick={handleEdit}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          {deleteStatus && <div className="alert alert-info">{deleteStatus}</div>}
        </div>
      </div>
  );
};

export default NoteDetailsCard;
