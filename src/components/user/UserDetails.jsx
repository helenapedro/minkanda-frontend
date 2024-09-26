import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { getCurrentUser } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const fetchedUser = await getCurrentUser();
        setUser(fetchedUser);
      } catch (err) {
        setError('Failed to fetch user details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!user) {
    return <div className="error-message">User details not found. Please log in again.</div>;
  }

  return (
    <div className='container mt-4'>
      <div className='card d-flex justify-content-center'>
          <div className="card-header">
            <h2>Hello, {user.firstname}!</h2>
          </div>
          
          <div className='card-body'>
            <p><strong>First Name:</strong> {user.firstname}</p>
            <p><strong>Last Name:</strong> {user.lastname}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}</p>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
            
            <button className="btn btn-secondary mt-3" onClick={() => navigate('/profile/edit')}>
              Edit Profile
            </button>

          </div>
      </div>
    </div>
  );
};

export default UserDetails;
