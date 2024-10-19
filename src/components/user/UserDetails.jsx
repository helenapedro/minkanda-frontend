import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isTester } from '../../utils/roleUtils';
import { useUserActions } from '../../actions/useUserActions';
import { Card, Button, Alert } from 'react-bootstrap';
import ReturnButton from '../common/ReturnButton';
import UserDetailsForm from '../../forms/UserDetailsForm';
import useFetchUserDetails from '../../actions/useFetchUserDetails';

const UserDetails = () => {
    const { user, loading, error, setError } = useFetchUserDetails();
    const [successMessage, setSuccessMessage] = useState('');
    const [deleting, setDeleting] = useState(false);
    const { handleDeleteUser } = useUserActions();
    const currentUser = useSelector((state) => state.user.userInfo);
    const tester = isTester(currentUser);

    const handleDelete = async () => {
        setDeleting(true);
        await handleDeleteUser(user.uid, setSuccessMessage, setError);
        setDeleting(false);
    };

    return (
      <Card className="border-0">
        <Card.Header className="d-flex justify-content-between align-items-center bg-light">
          <div className="d-flex align-items-center">
            <ReturnButton url="/notes" className="me-3" />
            <h2 className="mb-0 ms-2">{user?.firstname}'s Profile</h2>
          </div>
          <Link to="/profile/edit" className="btn btn-outline-primary">
            Edit
          </Link>
        </Card.Header>
        <Card.Body>
          {loading && <div className="text-center">Loading...</div>}
          {error && (
            <Alert variant="danger" className="text-center">
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success" className="mb-4 text-center">
              {successMessage}
            </Alert>
          )}
          <UserDetailsForm user={user} />
          {!tester && (
            <div className="text-center mt-4">
              <Button 
                variant="danger"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Profile'}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    );
};

export default UserDetails;
