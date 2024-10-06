import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUserAsync } from "../redux/userSlice";

export const useUserActions = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const handleDeleteUser = async (uid, setSuccessMessage, setError, setDeleting) => {
          try {
               const confirmed = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');
               if (!confirmed) {
               return;
               }

               setDeleting(true); 
               await dispatch(deleteUserAsync(uid)).unwrap();

               setSuccessMessage('Profile deleted successfully!');
               setTimeout(() => {
                    navigate('/login');
               }, 2000);
          } catch (err) {
               console.error('Error deleting user:', err);
               setError('Failed to delete user profile.');
          } finally {
               setDeleting(false); 
          }
     };

     return { handleDeleteUser };
};