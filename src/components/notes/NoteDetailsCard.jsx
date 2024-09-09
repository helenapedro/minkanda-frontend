import React, {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { deleteNoteAsync } from '../../redux/notesSlice';
import { useNavigate } from 'react-router-dom';
import getRandomColor from './NoteColor';

const NoteDetailsCard = ({ note }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleDelete = () => {
    dispatch(deleteNoteAsync(note.nid));
  };


  return (
      <div className="card mb-3" style={{ backgroundColor: cardColor}}>
        <div className='card-body'>
          <h5 className="card-title">{note.title}</h5>
          <button className="btn btn-primary" onClick={handleView}>View</button>
          <button className="btn btn-warning mx-2" onClick={handleEdit}>Edit</button>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </div>
  );
};

export default NoteDetailsCard;
