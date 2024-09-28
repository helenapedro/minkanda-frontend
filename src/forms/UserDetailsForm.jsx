import React from 'react';

const UserDetailsForm = ({ user }) => {
  
  return (
    <form className='mx-1 mx-md-4'>
      <div className='row'>
        <div className="col-md-6 mb-4">
          <label htmlFor="firstname">First Name:</label>
          <input type="text" id="firstname" className="form-control" value={user.firstname} readOnly />
        </div>
        <div className="col-md-6 mb-4">
          <label htmlFor="lastname">Last Name:</label>
          <input type="text" id="lastname" className="form-control" value={user.lastname} readOnly />
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6 mb-4">
          <label htmlFor="birthday">Birthday:</label>
          <input type="text" id="birthday" className="form-control" value={new Date(user.birthday).toLocaleDateString()} readOnly />
        </div>
        <div className="col-md-6 mb-4">
          <label htmlFor="gender">Gender:</label>
          <input type="text" id="gender" className="form-control" value={user.gender} readOnly />
        </div>
      </div>
      <div className='d-flex flex-row align-items-center mb-4'>
        <div className="col-md-6 mb-4">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" className="form-control" value={user.email} readOnly />
        </div>
      </div>
      <div className='row'>
        <div className='d-flex flex-row align-items-center mb-4'>
          <div className="col-md-6 mb-4">
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" className="form-control" value={user.address} readOnly />
          </div>
        </div>
        <div className='d-flex flex-row align-items-center mb-4'>
          <div className="col-md-6 mb-4">
            <label htmlFor="phoneNumber">Phone Number:</label>
            <input type="text" id="phoneNumber" className="form-control" value={user.phoneNumber} readOnly />
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserDetailsForm;
