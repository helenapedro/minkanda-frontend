import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserAsync, updateCurrentUserAsync } from '../../redux/userSlice';
import updateForm from '../../forms/updateForm';
import styles from './User.module.css';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const error = useSelector(state => state.user.error);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');

  const updateUserStatus = useSelector(state => state.user.updateUserStatus);

  useEffect(() => {
    if (updateUserStatus === 'fulfilled') {
      navigate('/profile'); 
      dispatch({ type: 'users/resetUpdateStatus' });
    }
  }, [updateUserStatus, navigate, dispatch]);

  useEffect(() => {
    dispatch(getCurrentUserAsync())
      .then(response => {
        setUser(response.payload);
      });

    return () => {
      dispatch({ type: 'users/clearError' });
    };
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      console.log('Received user data:', user);
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setBirthday(user.birthday);
      setPhoneNumber(user.phoneNumber);
      setAddress(user.address);

      dispatch({ type: 'users/clearError' }); 
    }
  }, [user, dispatch]);

  useEffect(() => {
    return () => {
      dispatch({ type: 'users/clearSelectedNote' });
    };
  }, [dispatch]);

  const handleUpdate = () => {
    if (!user) return;

    const updateUser = {
      ...user,
      firstname,
      lastname,
      birthday,
      phoneNumber,
      address,
    };

    dispatch(updateCurrentUserAsync({ uid: user.uid, ...updateUser }));
  };

  return (
    <section className="vh-100">
      <div className={`${styles.divider} ${styles.hCustom} container-fluid h-100`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-7 col-lg-6 col-xl-4">
            <h2 className="text-center">Edit User Information</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {updateForm(
              handleUpdate, 
              firstname, 
              setFirstname, 
              lastname, 
              setLastname,
              birthday,
              setBirthday,
              phoneNumber,
              setPhoneNumber,
              address,
              setAddress
            )}
            
            <button>Save Changes</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;