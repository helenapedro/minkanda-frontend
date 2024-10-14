import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getRandomColor from './NoteColor';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { fetchUserDetails } from '../../services/admin';
import { getCurrentUser } from '../../services/auth';

const PublicNotesDetailsCard = ({ note }) => {
  const navigate = useNavigate();
  const [cardColor, setCardColor] = useState(getRandomColor());
  const [ownerName, setOwnerName] = useState(null); 

  useEffect(() => {
    setCardColor(getRandomColor());
  }, [note]);

  const handleView = () => {
    navigate(`/notes/${note.nid}`);
  };
  
  return (
    <Card className="card mb-3" style={{ backgroundColor: cardColor, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
      <Card.Body style={{ padding: '20px', color: '#333' }}>
        <Card.Header as="h5" style={{ fontWeight: 'bold', color: '#fff' }}>{note.title}</Card.Header>
        <Button variant="primary" onClick={handleView} style={{ marginRight: '10px' }}>
          <FontAwesomeIcon icon={faEye} /> View
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PublicNotesDetailsCard;
