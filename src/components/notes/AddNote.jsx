import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addNoteAsync, toggleNotePrivacyAsync } from '../../redux/notesSlice';
import NoteForm from '../../forms/NoteForm';

const AddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { nid } = await dispatch( addNoteAsync({ title, body })).unwrap();
          
      if (!nid) {
        throw new Error('Note creation failed.');
      }

      if (isPublic) {
        await dispatch(toggleNotePrivacyAsync(nid)).unwrap();
      }
      
      navigate('/notes');
      setTitle('');
      setBody('');
      setIsPublic(false);
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <NoteForm
      title={title}
      setTitle={setTitle}
      body={body}
      setBody={setBody}
      isPublic={isPublic}
      setIsPublic={setIsPublic}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      
    />
  );
};

export default AddNote;
