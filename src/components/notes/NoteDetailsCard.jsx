import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import getRandomColor from './NoteColor';
import useFetchUserDetails from '../../actions/useFetchUserDetails';
import formatDate from '../common/FormateDate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';

const NoteDetailsCard = ({ note }) => {
  const navigate = useNavigate();
  const [cardColor, setCardColor] = useState(getRandomColor());
  const { user, loading, error } = useFetchUserDetails(); 

  useEffect(() => {
    setCardColor(getRandomColor());
  }, [note]);

  const handleView = () => {
    navigate(`/notes/${note.nid}`);
  };

  const handleEdit = () => {
    navigate(`/notes/edit/${note.nid}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card style={{ backgroundColor: cardColor, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
      <Card.Header as="h5" style={{ fontWeight: 'bold', color: '#fff' }}>{note.title}</Card.Header>
      <Card.Body style={{ padding: '20px', color: '#333' }}>
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">{`Created by ${user.firstname}`}</footer>
        </blockquote>
        <div style={{ marginTop: '10px', fontSize: 'smaller', color: '#6c757d' }}>{`Created at ${formatDate(note.createdAt)}`}</div>
        <div style={{ marginTop: '10px' }}>
          <Button variant="primary" onClick={handleView} style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faEye} /> View
          </Button>
          <Button variant="warning" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} /> Edit
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteDetailsCard;
