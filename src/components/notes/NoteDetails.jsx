import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNoteDetails from '../../actions/useNoteDetails';
import useOwnerDetails from '../../actions/useOwnerDetails';
import { useNoteActions } from '../../actions/useNoteActions';
import getRandomColor from './NoteColor';
import ReturnButton from '../common/ReturnButton';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../common/FormateDate';

const NoteDetails = () => {
  const { id } = useParams();
  const { note, loading, error } = useNoteDetails(id);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const ownerName = useOwnerDetails(note, user);
  const { handleDelete } = useNoteActions();
  const navigate = useNavigate();
  const cardColor = getRandomColor();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const admin = user?.roles?.includes('admin');
  const owner = note && note.userId === user?.id;

  return (
    <Container className="vh-100">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="mt-5"
            style={{
              backgroundColor: cardColor,
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
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
                  <Button variant="primary" onClick={() => navigate(`/notes/edit/${id}`)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit Note
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(id, setDeleteError, setDeleting)}
                    disabled={deleting}
                  >
                    <FontAwesomeIcon icon={faTrash} /> {deleting ? 'Deleting...' : 'Delete Note'}
                  </Button>
                </>
              )}
            </Card.Footer>
          </Card>
          {deleteError && <Error message={deleteError} />}
        </Col>
      </Row>
    </Container>
  );
};

export default NoteDetails;
