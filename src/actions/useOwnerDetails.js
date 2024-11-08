import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isOwner } from '../utils/roleUtils';
import { fetchUserDetailsAsync } from '../redux/userSlice';

const selectUserDetailsById = (state, userId) => 
  state.user.allUsers.find(user => user.uid === userId);

const useOwnerDetails = (note, user) => {
  const [ownerName, setOwnerName] = useState(null);
  const dispatch = useDispatch();
  const ownerDetails = useSelector((state) => selectUserDetailsById(state, note?.userId));

  useEffect(() => {
    const getOwnerDetails = async () => {
      try {
        if (note && note.userId && user && user.id) {
          if (isOwner(note, user)) {
            setOwnerName(user.firstname); 
          } else if (!ownerDetails) {
            const userData = await dispatch(fetchUserDetailsAsync(note.userId)).unwrap();
            setOwnerName(userData.firstname);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setOwnerName('Error fetching the owner’s name');
      }
    };

    getOwnerDetails();
  }, [note, user, dispatch, ownerDetails]);

  useEffect(() => {
    if (ownerDetails) {
      setOwnerName(ownerDetails.firstname);
    }
  }, [ownerDetails]);

  return ownerName;
};

export default useOwnerDetails;
