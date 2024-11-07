import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userSlice from '../redux/userSlice';
import UpdateForm from '../forms/UpdateForm';
import ReturnButton from '../components/common/ReturnButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as style from 'react-bootstrap';
import * as icon from '@fortawesome/free-solid-svg-icons';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error, updateUserStatus } = useSelector((state) => state.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
    dispatch(userSlice.getCurrentUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (updateUserStatus === 'fulfilled') {
      setIsEditing(false);
      dispatch(userSlice.resetUpdateStatus());
    }
  }, [updateUserStatus, dispatch]);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        email: userInfo.email || '',
        firstname: userInfo.firstname || '',
        lastname: userInfo.lastname || '',
        birthday: userInfo.birthday ? new Date(userInfo.birthday).toISOString().split('T')[0] : '',
        phoneNumber: userInfo.phoneNumber || '',
        address: userInfo.address || '',
        newPassword: '',
        currentPassword: '',
      });
      setGender(userInfo.gender || '');
    }
  }, [userInfo]);

  const handleEditToggle = () => setIsEditing((prev) => !prev);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUserData = { userId: userInfo.uid, ...formData, gender };
    if (showPasswordFields && formData.newPassword) {
      updatedUserData.password = formData.newPassword;
      updatedUserData.currentPassword = formData.currentPassword;
    }
    setIsLoading(true);
    dispatch(userSlice.updateCurrentUserAsync(updatedUserData))
      .finally(() => setIsLoading(false));
  };

  return (
    <style.Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <style.Row className="justify-content-center w-100">
        <style.Col xs={12} md={8} lg={6}>
          <style.Card className="shadow-sm border-0 rounded-3">
            <style.Card.Header className="d-flex justify-content-between align-items-center bg-info text-white p-3 rounded-top">
              <ReturnButton url="/notes" className="me-2 text-white" />
              <h4 className="mb-0 ms-2">{userInfo?.firstname}'s Profile</h4>
              <style.Button onClick={handleEditToggle} variant="outline-light" className="btn-sm p-1">
                <FontAwesomeIcon icon={icon.faEdit} size='sm' />
              </style.Button>
            </style.Card.Header>
            <style.Card.Body className="p-4">
              {loading && <style.Spinner animation="border" variant="primary" className="d-block mx-auto my-4" />}
              {error && <style.Alert variant="danger" className="text-center">{error}</style.Alert>}
              {isEditing ? (
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
              ) : (
                <div className="px-2 py-3">
                  <h5 className="text-muted mb-4">Personal Details</h5>
                  <p><strong>Email:</strong> {userInfo?.email}</p>
                  <p><strong>First Name:</strong> {userInfo?.firstname}</p>
                  <p><strong>Last Name:</strong> {userInfo?.lastname}</p>
                  <p><strong>Birthday:</strong> {new Date(userInfo?.birthday).toLocaleDateString('en-CA')}</p>
                  <p><strong>Phone:</strong> {userInfo?.phoneNumber}</p>
                  <p><strong>Address:</strong> {userInfo?.address}</p>
                  <p><strong>Gender:</strong> {userInfo?.gender}</p>
                </div>
              )}
            </style.Card.Body>
          </style.Card>
        </style.Col>
      </style.Row>
    </style.Container>
  );
};

export default UserProfile;
