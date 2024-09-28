import React, { useEffect, useState } from 'react';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { getCurrentUser } from '../../services/auth';
import { Link } from 'react-router-dom';
import UserDetailsForm from '../../forms/UserDetailsForm';

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
        <div className="card-header text-center">
          <h2>User Details</h2>
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
