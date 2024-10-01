import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrentUserAsync, selectUserInfo, resetUpdateStatus, clearError, clearSuccessMessage } from '../../redux/userSlice';
//import { fetchUserDetailsAsync } from '../../redux/userSlice';

const EditProfile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserInfo);
  const updateUserStatus = useSelector((state) => state.user.updateUserStatus);
  const error = useSelector((state) => state.user.error);
  const successMessage = useSelector((state) => state.user.successMessage);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    birthday: '',
    gender: '',
    address: '',
    phoneNumber: '',
    password: ''
  });

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstname: userInfo.firstname,
        lastname: userInfo.lastname || '',
        birthday: userInfo.birthday ? new Date(userInfo.birthday).toISOString().split('T')[0]: '',
        gender: userInfo.gender ? userInfo.gender.toLowerCase() : '',
        address: userInfo.address || '',
        phoneNumber: userInfo.phoneNumber || '',
        password: ''
      });
    }
  }, [userInfo]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const updatedUserData = {
      userId: userInfo.uid,
      ...formData,
      birthday: formData.birthday ? formData.birthday + 'T00:00:00.000+00:00' : null, // Handle null birthday
    };
  
    console.log('Sending update with data:', updatedUserData);
    dispatch(updateCurrentUserAsync(updatedUserData));
  };
  

  const handleClear = () => {
    dispatch(resetUpdateStatus());
    dispatch(clearError());
    dispatch(clearSuccessMessage());
  };

  return (
    <div className="user-profile-update">
      <h2>Update Your Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="birthday">Birthday:</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update Profile</button>
        {updateUserStatus === 'fulfilled' && (
          <button type="button" onClick={handleClear}>
            Clear Messages
          </button>
        )}
      </form>
    </div>
  );
};

export default EditProfile;
