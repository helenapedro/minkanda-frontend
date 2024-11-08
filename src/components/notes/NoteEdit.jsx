import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import ReturnButton from '../common/ReturnButton';
import useNoteEditor from '../../actions/useNoteEditor';

const NoteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    title,
    setTitle,
    body,
    setBody,
    isPublic,
    isLoading,
    note,
    error,
    handleSave,
    handleTogglePrivacy
  } = useNoteEditor(id, navigate);

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <ReturnButton url="/notes" style={{ marginRight: '10px' }} />
        <h2>Edit Note</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows="10"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={handleTogglePrivacy}
            variant="secondary"
            disabled={isLoading}
          >
            {isPublic ? 'Make Private' : 'Make Public'}
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isLoading || !note}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Save'}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default NoteEdit;
