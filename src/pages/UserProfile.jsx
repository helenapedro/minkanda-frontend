import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAsync, updateCurrentUserAsync, resetUpdateStatus } from '../redux/userSlice';
import { Spinner, Alert, Card, Container, Row, Col, Button } from 'react-bootstrap';
import ReturnButton from '../components/common/ReturnButton';
import UpdateForm from '../forms/UpdateForm';

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
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (updateUserStatus === 'fulfilled') {
      setIsEditing(false);  // Switch back to view mode after a successful update
      dispatch(resetUpdateStatus());
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
    dispatch(updateCurrentUserAsync(updatedUserData))
      .finally(() => setIsLoading(false));
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white p-3 rounded-top">
              <ReturnButton url="/notes" className="me-2 text-white" />
              <h4 className="mb-0 ms-2">{userInfo?.firstname}'s Profile</h4>
              <Button onClick={handleEditToggle} variant="outline-light" className="btn-sm">
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </Card.Header>
            <Card.Body className="p-4">
              {loading && <Spinner animation="border" variant="primary" className="d-block mx-auto my-4" />}
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
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
                  <p><strong>Birthday:</strong> {userInfo?.birthday}</p>
                  <p><strong>Phone:</strong> {userInfo?.phoneNumber}</p>
                  <p><strong>Address:</strong> {userInfo?.address}</p>
                  <p><strong>Gender:</strong> {userInfo?.gender}</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
