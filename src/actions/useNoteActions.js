import { useNavigate } from 'react-router-dom';
import { deleteNote } from '../services/api';

export const useNoteActions = () => {
  const navigate = useNavigate();

  const handleDelete = async (id, setError) => {
     try {
          const confirmed = window.confirm("Are you sure you want to delete this note?");
          if (!confirmed) {
               return;
          }
          await deleteNote(id);
          navigate('/notes');
     } catch (err) {
       setError('Failed to delete note.');
       console.error(err);
     }
  };

  return { handleDelete };
};
