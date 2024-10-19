import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Alert } from 'react-bootstrap';
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

     if (showPasswordFields && formData.newPassword) {
      updatedUserData.password = formData.newPassword;
      updatedUserData.currentPassword = formData.currentPassword;
    } else {
      delete updatedUserData.newPassword;
      delete updatedUserData.currentPassword;
    }

    setIsLoading(true);

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
    <Container fluid className="vh-70 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light">
              <div className="d-flex align-items-center">
                <ReturnButton url="/profile" className="me-2" />
                <h2 className="mb-0 ms-2">Edit Profile</h2>
              </div>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
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
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfile;
