import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';
import { deleteUserAsync } from '../../redux/userSlice';
import Loading from '../common/Loading';
import Error from '../common/Error';
import ReturnButton from '../common/ReturnButton';
import UserDetailsForm from '../../forms/UserDetailsForm';
import styles from './User.module.css'

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
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

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      dispatch(deleteUserAsync(user.uid))
        .then(() => {
          setSuccessMessage('Profile deleted successfully!');
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
  };

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
    <section className="vh-100">
      <div className={`${styles.divider} ${styles.hCustom} container-fluid h-100`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ReturnButton url="/notes" style={{ marginLeft: '10px' }} />
              <h2 style={{ margin: 0, marginLeft: '10px' }}>{user.firstname}'s profile</h2>
            </div>
            <Link to="/profile/edit" className="btn btn-secondary mt-3" style={{ marginRight: '12px' }}>
              Edit
            </Link>
          </div>
          <div className="card-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <UserDetailsForm user={user} />
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Profile
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
