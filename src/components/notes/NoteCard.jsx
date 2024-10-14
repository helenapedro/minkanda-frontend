import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import getRandomColor from './NoteColor';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../common/FormateDate';
import { fetchUserDetailsAsync, setAuthor } from '../../redux/userSlice';

const NoteCard = ({ note, isPublic }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardColor, setCardColor] = useState(getRandomColor());
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
    <Card className="card mb-3" style={{ backgroundColor: cardColor, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', borderRadius: '10px' }}>
      <Card.Body style={{ padding: '20px', color: '#333' }}>
        <Card.Header as="h5" style={{ fontWeight: 'bold', color: '#fff' }}>{note.title}</Card.Header>
        {author && isPublic && (
          <blockquote className="blockquote mb-0">
            <footer className="blockquote-footer">{`Created by ${author.firstname}`}</footer>
          </blockquote>
        )}
        <div style={{ marginTop: '10px', fontSize: 'smaller', color: '#6c757d' }}>{`Created at ${formatDate(note.createdAt)}`}</div>
        <div style={{ marginTop: '10px' }}>
          <Button variant="primary" onClick={handleView} style={{ marginRight: '10px' }}>
            <FontAwesomeIcon icon={faEye} /> View
          </Button>
          {!isPublic && (
            <Button variant="warning" onClick={handleEdit}>
              <FontAwesomeIcon icon={faEdit} /> Edit
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default NoteCard;