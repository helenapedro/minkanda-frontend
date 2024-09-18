import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import getRandomColor from './NoteColor';

const PublicNotesDetailsCard = ({ note }) => {
  const navigate = useNavigate();
  const [cardColor, setCardColor] = useState(getRandomColor());

  useEffect(() => {
    setCardColor(getRandomColor());
  }, [note]);

  const handleView = () => {
    navigate(`/notes/${note.nid}`);
  };
  
  return (
     <div className="card mb-3" style={{ backgroundColor: cardColor}}>
          <div className='card-body'>
               <h5 className="card-title">{note.title}</h5>
               <button className="btn btn-primary" onClick={handleView}>View</button>
          </div>
     </div>
  );
};

export default PublicNotesDetailsCard;
