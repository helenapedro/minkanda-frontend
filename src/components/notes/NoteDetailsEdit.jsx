import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useNoteDetails from '../../actions/useNoteDetails';
import { useNoteActions } from '../../actions/useNoteActions';
import useNoteEditor from '../../actions/useNoteEditor';
import { isAdmin, isOwner } from '../../utils/roleUtils';
import ReturnButton from '../common/ReturnButton';
import Error from '../common/Error';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import formatDate from '../common/FormateDate';
import styles from '../../styles/NoteDetails.module.css';

const canUserEditNote = (note, user) => isOwner(note, user) || isAdmin(user);

const NoteDetailsEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { note, loading, error } = useNoteDetails(id);
  const user = useSelector((state) => state.user.userInfo);
  const { handleDelete } = useNoteActions();
  const { title, setTitle, body, setBody, handleSave } = useNoteEditor(id, navigate);
  const { isPublic, isLoading, handleTogglePrivacy } = useNoteEditor(id, navigate);

  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const userCanEdit = canUserEditNote(note, user);

  const handleAlertClose = () => setShowAlert(false);

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return <Error />;
  }

  return (
    <Container className="vh-100">
      <Row className="justify-content-center">
        <Col md={8}>
          {showAlert && (
            <Alert variant="success" onClose={handleAlertClose} dismissible>
              Note saved successfully!
            </Alert>
          )}
          <Card className={`${styles["note-card"]} mt-5`} >
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
              {note.updatedAt && note.updatedAt !== note.createdAt && (
                <div className={`${styles["text-muted"]} small`}>
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
            {userCanEdit && (
              <Card.Footer className="d-flex justify-content-between align-items-center">
                {editing ? (
                  <>
                    <Button variant="secondary" onClick={handleTogglePrivacy} disabled={isLoading}>
                      {isPublic ? 'Make Private' : 'Make Public'}
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleSave();
                        setShowAlert(true);
                      }}
                      disabled={isLoading || !note}
                    >
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
