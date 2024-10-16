import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';   
import { useNoteActions } from '../../actions/useNoteActions';
import { fetchNoteById } from '../../services/api';
import { isAdmin, isOwner } from '../../utils/roleUtils';
import getRandomColor from './NoteColor';
import ReturnButton from '../common/ReturnButton';
import Loading from '../common/Loading';
import Error from '../common/Error';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';   

import formatDate from '../common/FormateDate';

import { fetchUserDetails } from '../../services/admin';

const NoteDetails = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const   
 [cardColor, setCardColor] = useState(getRandomColor());
  const { handleDelete } = useNoteActions();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo);
  const admin = isAdmin(user);
  const owner = isOwner(note, user);
  const [ownerName, setOwnerName] = useState(null); 

  useEffect(() => {
    const getNoteDetails = async () => {
      try {
        const fetchedNote = await fetchNoteById(id);
        setNote(fetchedNote);
      } catch (err) {
        setError('Failed to fetch note details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNoteDetails();
  }, [id]);

  useEffect(() => {
    setCardColor(getRandomColor());

    if (note && note.userId?.toString() !== user.id?.toString()) {
      console.log('Fetching user details for userId:', note.userId);
      fetchUserDetails(note.userId)
        .then(userData => {
          setOwnerName(userData.name);
          console.log('Fetched user data:', userData);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
          setOwnerName('Error fetching the Owners name');
        });
    }
  }, [id, note, user.id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <section className="vh-100">
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="mt-5" style={{ backgroundColor: cardColor, borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
                {note.title}
                <ReturnButton url="/notes" />
              </Card.Header> 
              <Card.Body>
                {ownerName && (
                  <blockquote className="blockquote mb-0">
                    <footer className="blockquote-footer">{`Created by ${ownerName}`}</footer>
                  </blockquote>
                )}
                {note.updatedAt && note.updatedAt !== note.createdAt && (
                  <div style={{ marginTop: '10px', fontSize: 'smaller', color: '#6c757d' }}>
                    {`Updated on ${formatDate(note.updatedAt)}`}
                  </div>
                )}
                <Card.Text>{note.body}</Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                {(owner || admin) && (
                  <>
                    <Button 
                      variant="primary" 
                      onClick={() => navigate(`/notes/edit/${id}`)}
                    >
                      <FontAwesomeIcon icon={faEdit} /> Edit Note
                    </Button>
                    <Button 
                      variant="danger" 
                      onClick={() => handleDelete(id, setError, setDeleting)} disabled={deleting}
                    >
                      <FontAwesomeIcon icon={faTrash} /> {deleting ? 'Deleting...' : 'Delete Note'}
                    </Button>
                  </>
                )}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NoteDetails;