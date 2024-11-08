import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNoteByIdAsync, updateNoteAsync, toggleNotePrivacyAsync, resetUpdateStatus, clearSuccessMessage } from '../redux/notesSlice';

const useNoteEditor = (id, navigate) => {
  const dispatch = useDispatch();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const note = useSelector((state) => state.notes.selectedNote);
  const error = useSelector((state) => state.notes.error);
  const updateNoteStatus = useSelector((state) => state.notes.updateNoteStatus);
  const successMessage = useSelector((state) => state.notes.successMessage);

  useEffect(() => {
    if (updateNoteStatus === 'fulfilled') {
      alert('Note updated successfully!');
      setTimeout(() => {
        navigate('/notes');
        dispatch(resetUpdateStatus());
      }, 2000);
    }
  }, [updateNoteStatus, navigate, dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchNoteByIdAsync(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setIsPublic(note.isPublic);
    }
  }, [note]);

  useEffect(() => {
    if (successMessage === 'Privacy toggled successfully!') {
      alert(successMessage);
      navigate('/notes');
      dispatch(clearSuccessMessage());
    }
  }, [successMessage, navigate, dispatch]);

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

  return {
    title, setTitle,
    body, setBody,
    isPublic, setIsPublic,
    isLoading,
    note,
    error,
    handleSave,
    handleTogglePrivacy
  };
};

export default useNoteEditor;
