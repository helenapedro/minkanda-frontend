import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../redux/userSlice'; 
import UserDetails from '../components/user/UserDetails'; // Certifique-se que o caminho está correto
import EditProfile from '../components/user/EditProfile'; 

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(state => state.user); 

  useEffect(() => {
    dispatch(loginUserAsync()); 
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-4"> 
      <div className="row">
        <div className="col-md-8 offset-md-2"> 
          <h2>My Profile</h2>
          <UserDetails user={userInfo} />
          <EditProfile user={userInfo} /> 
        </div>
      </div>
    </div>
  );
};

export default UserProfile;