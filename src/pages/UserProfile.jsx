import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAsync } from '../redux/userSlice'; 
import UserDetails from '../components/user/UserDetails'; 
import Loading from './../components/common/Loading';
import Error from './../components/common/Error';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(state => state.user);

  const fetchUserData = () => {
    dispatch(getCurrentUserAsync());
  };

  useEffect(() => {
    fetchUserData();
  }, [dispatch]);

  useEffect(() => {
    const handleRouteChange = () => {
      fetchUserData();
    };

    window.addEventListener('focus', handleRouteChange); 
    return () => window.removeEventListener('focus', handleRouteChange);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="vh-100"> 
      <div className="container-fluid h-100">
        <div className="row d-flex justify-content-center align-items-center h-100"> 
          <UserDetails user={userInfo} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;