import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetailsAsync, setAuthor } from '../../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit } from '@fortawesome/free-solid-svg-icons';
import * as styles from 'react-bootstrap/'
import getRandomColor from './NoteColor';
import formatDate from '../common/FormateDate';

const NoteCard = ({ note, isPublic, sortByDate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cardColor, setCardColor] = useState(getRandomColor());
  //const author = useSelector((state) => state.user.userInfo);
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
      <styles.Card className='mb-3 p-4 shadow-sm' style={{ backgroundColor: cardColor, borderRadius: '10px'}}>
        <styles.Card.Header as="h5" className='text-white' style={{ fontWeight: 'bold', backgroundColor: '#333', borderRadius: '5px' }}>
          {note.title}
        </styles.Card.Header>
        <styles.Card.Body style={{ color: '#333' }}>
          <div className='text-muted mb-3'>
            {`Created at ${formatDate(note.createdAt)}`}
          </div>
          <styles.Card.Text className='mt-3' style={{ textAlign: 'justify' }}>
            {note.body.substring(0, 60)}...
          </styles.Card.Text>
          <div className='d-flex justify-content-between'>
            <styles.Button variant="primary" onClick={handleView}>
              <FontAwesomeIcon icon={faEye} /> View
            </styles.Button>
            {/* {!isPublic && (
              <styles.Button variant="warning" onClick={handleEdit}>
                <FontAwesomeIcon icon={faEdit} /> Edit
              </styles.Button>
            )} */}
          </div>
        </styles.Card.Body>
      </styles.Card>
  );
};

export default NoteCard;