import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../../services/auth';
import { useUserActions } from '../../actions/useUserActions';
import { useSelector } from 'react-redux';
import { isTester } from '../../utils/roleUtils';
import Loading from '../common/Loading';
import Error from '../common/Error';
import ReturnButton from '../common/ReturnButton';
import UserDetailsForm from '../../forms/UserDetailsForm';
import styles from './User.module.css';

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleting, setDeleting] = useState(false); 
  const { handleDeleteUser } = useUserActions();

  const currentUser = useSelector((state) => state.user.userInfo);
  const tester = isTester(currentUser);

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

  const handleDelete = async () => {
    setDeleting(true); 
    await handleDeleteUser(user.uid, setSuccessMessage, setError); 
    setDeleting(false); 
  };

  return (
    <section className="vh-100">
      <div className={`${styles.divider} ${styles.hCustom} container-fluid h-100`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ReturnButton url="/notes" style={{ marginRight: '10px' }} />
              <h2 style={{ margin: 0, marginLeft: '10px' }}>{user.firstname}'s profile</h2>
            </div>
            <Link to="/profile/edit" className="btn btn-secondary mt-3">
              Edit
            </Link>
          </div>
          <div className="card-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <UserDetailsForm user={user} />
            {!tester && (
              <button 
                className="btn btn-danger" 
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete Profile'}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;
