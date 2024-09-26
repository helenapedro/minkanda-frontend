import React from 'react';

const UserDetails = ({ user }) => {
  return (
    <div className="user-details">
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>First Name:</strong> {user.firstname}</p>
      <p><strong>Last Name:</strong> {user.lastname}</p>
      <p><strong>Birthday:</strong> {new Date(user.birthday).toLocaleDateString()}</p> 
      {/* Add more fields as needed (gender, phone, address, etc.) */}
      <p><strong>Role:</strong> {user.roles.map(role => role.name).join(', ')}</p> 
    </div>
  );
};

export default UserDetails;