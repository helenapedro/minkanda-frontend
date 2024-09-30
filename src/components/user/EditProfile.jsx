import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserAsync, updateCurrentUserAsync } from '../../redux/userSlice';
import styles from './User.module.css';
import UpdateForm from './../../forms/updateForm';

const EditProfile = () => {
  const [user, setUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector(state => state.user.error);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    phoneNumber: '',
    address: '',
    password: '',
    currentPassword: '',
  });
  
  const [gender, setGender] = useState('');
  const updateUserStatus = useSelector(state => state.user.updateUserStatus);

  useEffect(() => {
    if (updateUserStatus === 'fulfilled') {
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => {
        navigate('/profile'); // Navigates to the profile page after updating
        dispatch({ type: 'users/resetUpdateStatus' });
      }, 2000); 
    }
  }, [updateUserStatus, navigate, dispatch]);

  useEffect(() => {
    dispatch(getCurrentUserAsync())
      .then(response => {
        if (response.payload) {
          setUser(response.payload);
          setFormData({
            firstname: response.payload.firstname || '',
            lastname: response.payload.lastname || '',
            email: response.payload.email || '',
            birthday: response.payload.birthday ? new Date(response.payload.birthday).toISOString().split('T')[0]: '',
            phoneNumber: response.payload.phoneNumber || '',
            address: response.payload.address || '',
            password: '',
            currentPassword: '',
          });
          setGender(response.payload.gender || '');
        } else {
          console.error('Failed to fetch user data:', response.error);
        }
      });

    return () => {
      dispatch({ type: 'users/clearError' });
    };
  }, [dispatch]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault(); 
    if (!user) return;

    setIsLoading(true);
    const updatedUser = { ...user, ...formData, gender };

    dispatch(updateCurrentUserAsync({ uid: user.uid, ...updatedUser }))
      .then(response => {
        setIsLoading(false);
        if (response.error) {
          console.error('Failed to update user:', response.error);
        } else {
          console.log('User updated successfully:', response.payload);
        }
      });
  };
  
  return (
    <section className="vh-100">
      <div className={`${styles.divider} ${styles.hCustom} container-fluid h-100`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-7 col-lg-6 col-xl-4">
            <h2 className="text-center">Edit User Information</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <UpdateForm
              handleUpdate={handleUpdate}
              formData={formData}
              handleChange={handleChange}
              gender={gender}
              setGender={setGender}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
