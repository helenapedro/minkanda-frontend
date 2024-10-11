import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNoteByIdAsync, updateNoteAsync, toggleNotePrivacyAsync, resetUpdateStatus } from '../../redux/notesSlice';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import ReturnButton from '../common/ReturnButton';

const NoteEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  // State for handling form inputs
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Redux selectors for note data and update status
  const note = useSelector((state) => state.notes.selectedNote);
  const error = useSelector((state) => state.notes.error);
  const updateNoteStatus = useSelector((state) => state.notes.updateNoteStatus);
  const successMessage = useSelector((state) => state.notes.successMessage);

  // Handle API call status updates
  useEffect(() => {
    if (updateNoteStatus === 'fulfilled') {
      alert('Note updated successfully!');
      setTimeout(() => {
        navigate('/notes'); 
        dispatch(resetUpdateStatus());
      }, 2000);
    }
  }, [updateNoteStatus, navigate, dispatch]);

  // Fetch the note when component loads
  useEffect(() => {
    if (id) {
      dispatch(fetchNoteByIdAsync(id));
    }
  }, [dispatch, id]);

  // Populate fields when note is loaded
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setIsPublic(note.isPublic);
    }
  }, [note]);
  
  const handleSave = async () => {
    if (!note) return;

    const updatedNote = {
      nid: note.nid,
      title,
      body,
      isPublic
    };

    setIsLoading(true);

    try {
      await dispatch(updateNoteAsync(updatedNote)).unwrap(); 
    } catch (error) {
      console.error('Oops! Something went wrong on our end. Please try again later.', error);
    } finally {
      setIsLoading(false); 
    }
  };
  
  const handleTogglePrivacy = async () => {
    if (!note) return;

    setIsLoading(true);

    try {
      await dispatch(toggleNotePrivacyAsync(note.nid)).unwrap();
      setIsPublic((prev) => !prev);
    } catch (error) {
      console.error('Error toggling privacy:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <ReturnButton url="/notes" style={{ marginRight: '10px' }} />
        <h2>Edit Note</h2>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

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
