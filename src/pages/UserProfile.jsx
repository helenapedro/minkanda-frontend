import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAsync } from '../redux/userSlice'; 
import UserDetails from '../components/user/UserDetails'; 
import EditProfile from '../components/user/EditProfile'; 
import Loading from './../components/common/Loading';
import Error from './../components/common/Error';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  useEffect(() => {
    console.log('User Info:', userInfo);
  }, [userInfo]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  return (
    <div className="container mt-4"> 
      <div className="row">
        <div className="col-md-8 offset-md-2"> 
          <UserDetails user={userInfo} />
          {/* <EditProfile user={userInfo} /> */} 
        </div>
      </div>
    </div>
  );
};

export default UserProfile;