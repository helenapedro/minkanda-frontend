import React from 'react';

const UserDetailsForm = ({ user }) => {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="firstname">First Name:</label>
        <input type="text" id="firstname" className="form-control" value={user.firstname} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last Name:</label>
        <input type="text" id="lastname" className="form-control" value={user.lastname} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" className="form-control" value={user.email} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="birthday">Birthday:</label>
        <input type="text" id="birthday" className="form-control" value={new Date(user.birthday).toLocaleDateString()} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <input type="text" id="gender" className="form-control" value={user.gender} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="address">Address:</label>
        <input type="text" id="address" className="form-control" value={user.address} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" className="form-control" value={user.phoneNumber} readOnly />
      </div>
    </form>
  );
};

export default UserDetailsForm;
