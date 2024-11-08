import { useDispatch } from 'react-redux';
import { fetchNotesAsync, deleteNoteAsync } from '../redux/notesSlice';

export const useNoteDeleteAction = () => {
  const dispatch = useDispatch();

  const handleDelete = async (id, setDeleteStatus) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this note?");
      if (!confirmed) {
        return;
      }

      const resultAction = await dispatch(deleteNoteAsync(id)).unwrap();
      
      if (resultAction && resultAction.success) {
        setDeleteStatus('Note successfully deleted.');
        dispatch(fetchNotesAsync());
        window.location.reload(); 
      } else {
        setDeleteStatus('Note deletion failed.');
      }
    } catch (error) {
      setDeleteStatus('Error deleting note.');
      console.error('Delete failed:', error);
    }
  };

  return { handleDelete };
};
