import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsAsync, setAuthor } from '../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import getRandomColor from './NoteColor';
import formatDate from '../common/FormateDate';
import { faEye, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Card, Button, Collapse } from 'react-bootstrap';



const NoteCard = ({ note, isPublic }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardColor, setCardColor] = useState(getRandomColor());
  const [open, setOpen] = useState(false);
  const author = useSelector((state) => state.user.userInfo);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    setCardColor(getRandomColor());

    if (isPublic && note.uid) {
      dispatch(fetchUserDetailsAsync(note.uid))
        .then((fetchedAuthor) => {
          if (fetchedAuthor && fetchedAuthor.id === note.uid) {
            dispatch(setAuthor(fetchedAuthor));
          }
        })
        .catch((error) => {
          console.error('Error fetching author details:', error);
        });
    }
  }, [note, isPublic, dispatch]);

  const handleView = () => {
    navigate(`/notes/${note.nid}`);
  };

  const handleEdit = () => {
    navigate(`/notes/edit/${note.nid}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="mb-3 p-4 shadow-sm note-card" style={{ backgroundColor: cardColor, borderRadius: '10px', transition: 'transform 0.3s' }}>
      <Card.Header as="h5" className="text-white d-flex justify-content-between align-items-center" style={{ fontWeight: 'bold', backgroundColor: '#333', borderRadius: '5px' }}>
        {note.title}
        <Button
          variant="link"
          className="text-white p-0"
          onClick={() => setOpen(!open)}
          aria-controls="note-collapse-text"
          aria-expanded={open}
        >
          <FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />
        </Button>
      </Card.Header>
      <Collapse in={open}>
        <Card.Body style={{ color: '#333' }}>
          <div className="text-muted mb-3">
            {`Created at ${formatDate(note.createdAt)}`}
          </div>
          {author && (
            <div className="text-muted mb-3">
              {`Author: ${author.name}`}
            </div>
          )}
          <Card.Text className="mt-3" style={{ textAlign: 'justify' }}>
            {note.body.length > 60 ? `${note.body.substring(0, 60)}...` : note.body}
          </Card.Text>
          <div className="d-flex justify-content-between">
            <Button variant="primary" onClick={handleView} title="View Note">
              <FontAwesomeIcon icon={faEye} /> View
            </Button>
          </div>
        </Card.Body>
      </Collapse>
    </Card>
  );
};

export default NoteCard;
