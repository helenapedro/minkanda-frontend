import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { getCurrentUser } from '../../services/auth';
import { Link } from 'react-router-dom';
import UserDetailsForm from '../../forms/UserDetailsForm';
import ReturnButton from '../common/ReturnButton';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className='card'>
        <div 
          className="card-header"
          style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
        >
          <ReturnButton url="/notes" style={{ marginRight: '10px' }}  />
          <h2 style={{ margin: 0, marginLeft: '10px' }}>User Details</h2>
          {/* <h2>Hello, {user.firstname}!</h2> */}
        </div>
        <div className='card-body'>
          <UserDetailsForm user={user} />
          <Link to="/profile/edit" className="btn btn-secondary mt-3">
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
