import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import getRandomColor from './NoteColor';
import useFetchUserDetails from '../../actions/useFetchUserDetails';
import formatDate from '../common/FormateDate';

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
    <Card style={{ backgroundColor: cardColor }}>
      <Card.Header as="h5">{note.title}</Card.Header>
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">{`Created by ${user.firstname}`}</footer>
        </blockquote>
        <Button variant="primary" onClick={handleView}>View</Button>
        <Button variant="warning mx-2" onClick={handleEdit}>Edit</Button>
      </Card.Body>
      <Card.Footer className="text-muted">{formatDate(note.createdAt)}</Card.Footer>
      <blockquote className="blockquote mb-0">
          <footer className="blockquote-footer">{`Created by ${user.firstname}`}</footer>
        </blockquote>
    </Card>
  );
};

export default NoteDetailsCard;
