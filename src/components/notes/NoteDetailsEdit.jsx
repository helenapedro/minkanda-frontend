import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNoteDetails from '../../actions/useNoteDetails';
import useOwnerDetails from '../../actions/useOwnerDetails';
import { useNoteActions } from '../../actions/useNoteActions';
import useNoteEditor from '../../actions/useNoteEditor';
import { isAdmin, isOwner } from '../../utils/roleUtils';
import getRandomColor from './NoteColor';
import ReturnButton from '../common/ReturnButton';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faSave, faEye } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../common/FormateDate';

const NoteDetailsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, loading, error } = useNoteDetails(id);
  const user = useSelector((state) => state.user.userInfo);
  //const ownerName = useOwnerDetails(note, user);
  const { handleDelete } = useNoteActions();
  const { 
    title, setTitle, 
    body, setBody, 
    isPublic, 
    isLoading, 
    handleSave, 
    handleTogglePrivacy 
  } = useNoteEditor(id, navigate);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const cardColor = getRandomColor();
  const userCanEdit = isOwner(note, user) || isAdmin(user);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }


  return (
    <Container className="vh-100">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card
            className="mt-5"
            style={{
              //backgroundColor: cardColor,
              borderRadius: '10px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            }}
          >
            <Card.Header as="h2" className="d-flex justify-content-between align-items-center">
              {editing ? (
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              ) : (
                note.title
              )}
              <ReturnButton url="/notes" /> 
            </Card.Header>
            <Card.Body>
              {/* {ownerName && (
                <blockquote className="blockquote mb-0">
                  <footer className="blockquote-footer">{`
                   ${ownerName}`}</footer>
                </blockquote>
              )} */}
              {note.updatedAt && note.updatedAt !== note.createdAt && (
                <div style={{ marginTop: '10px', fontSize: 'smaller', color: '#6c757d' }}>
                  {`Updated on ${formatDate(note.updatedAt)}`}
                </div>
              )}
              {editing ? (
                <Form.Control
                  as="textarea"
                  rows="10"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              ) : (
                <Card.Text>{note.body}</Card.Text>
              )}
            </Card.Body>
               { (userCanEdit) && (
               <Card.Footer className="d-flex justify-content-between align-items-center">
               {editing ? (
                    <>
                    <Button variant="secondary" onClick={handleTogglePrivacy} disabled={isLoading}>
                         {isPublic ? 'Make Private' : 'Make Public'}
                    </Button>
                    <Button variant="primary" onClick={handleSave} disabled={isLoading || !note}>
                         {isLoading ? <Spinner animation="border" size="sm" /> : 'Save'}
                    </Button>
                    <Button variant="link" onClick={() => setEditing(false)}>
                         <FontAwesomeIcon icon={faEye} /> View
                    </Button>
                    </>
               ) : (
                    <>
                    <Button variant="primary" onClick={() => setEditing(true)}>
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
          )}
          </Card>
          {deleteError && <Error message={deleteError} />}
        </Col>
      </Row>
    </Container>
  );
};

export default NoteDetailsEdit;
