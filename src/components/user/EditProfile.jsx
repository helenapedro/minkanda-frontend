import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './User.module.css';
import ReturnButton from '../common/ReturnButton';
import UpdateForm from './../../forms/updateForm';
import { updateCurrentUserAsync, selectUserInfo, resetUpdateStatus } from '../../redux/userSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const navigate = useNavigate();
  const updateUserStatus = useSelector((state) => state.user.updateUserStatus);
  const [isLoading, setIsLoading] = useState(false);
  const error = useSelector((state) => state.user.error);
  const successMessage = useSelector((state) => state.user.successMessage);
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    currentPassword: '',
    firstname: '',
    lastname: '',
    birthday: '',
    phoneNumber: '',
    address: '',
  });
  const [gender, setGender] = useState('');

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  useEffect(() => {
    if (updateUserStatus === 'fulfilled') {
      alert('Profile updated successfully!');
      setTimeout(() => {
        navigate('/profile');
        dispatch(resetUpdateStatus());
      }, 2000); 
    }
  }, [updateUserStatus, navigate, dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        email: userInfo.email || '',
        newPassword: '',
        currentPassword: '',
        firstname: userInfo.firstname || '',
        lastname: userInfo.lastname || '',
        birthday: userInfo.birthday ? new Date(userInfo.birthday).toISOString().split('T')[0]: '',
        phoneNumber: userInfo.phoneNumber || '',
        address: userInfo.address || '',
      });
      setGender(userInfo.gender || '');
    } else {
      console.error('Failed to fetch user data:', error);
    }
    
  }, [userInfo, error]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      userId: userInfo.uid,
      ...formData,
      gender
    };

     // Only include password fields if a new password has been provided
     if (showPasswordFields && formData.newPassword) {
      updatedUserData.password = formData.newPassword;
      updatedUserData.currentPassword = formData.currentPassword;
    } else {
      // Remove password-related fields if they are not being updated
      delete updatedUserData.newPassword;
      delete updatedUserData.currentPassword;
    }

    setIsLoading(true);

    // Dispatch the update action
    dispatch(updateCurrentUserAsync(updatedUserData))
      .then(response => {
        setIsLoading(false);
        if (response.error) {
          console.error('Failed to update user:', response.error);
        } else {
          console.log('User updated successfully:', response.userInfo);
        }
      });
  };

  return (
    <section className="vh-100">
      <div className={`${styles.divider} ${styles.hCustom} container-fluid h-100`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-7 col-lg-6 col-xl-4">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ReturnButton url="/profile" style={{ marginRight: '10px' }} />
              <h2 style={{ margin: 0, marginLeft: '10px' }}>Edit Profile</h2>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            
            <UpdateForm
              handleSubmit={handleSubmit}
              formData={formData}
              handleChange={handleChange}
              gender={gender}
              setGender={setGender}
              showPasswordFields={showPasswordFields}
              setShowPasswordFields={setShowPasswordFields}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfile;
