import Gender from './Gender';

const UpdateForm = ({handleSubmit, formData, handleChange, gender, setGender, showPasswordFields, setShowPasswordFields, isLoading}) => {
  return (
    <form className='mx-1 mx-md-4' onSubmit={handleSubmit}>
      <div className='row'>
        <div className="col-md-6 mb-4">
          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
          <div data-mdb-input-init className="form-outline flex-fill mb-0">
            <input
              type="text"
              id="firstname"
              placeholder="First Name"
              className="form-control"
              value={formData.firstname}
              onChange={handleChange}
              name="firstname"
              autoComplete="given-name"
            />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
          <div className="form-outline flex-fill mb-0">
            <input
              type="text"
              id="lastname"
              placeholder='Last Name'
              className="form-control"
              value={formData.lastname}
              onChange={handleChange}
              name="lastname"
              autoComplete="family-name"
            />
          </div>
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6 mb-4 d-flex align-items-center">
          <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
          <div className="form-outline datepicker w-100">
            <input
              type="date"
              id="birthday"
              className="form-control form-control-lg"
              value={formData.birthday}
              onChange={handleChange}
              name="birthday"
            />
            <label className="form-label" htmlFor="birthday">Birthday</label>
          </div>  
          <Gender gender={gender} setGender={setGender} />
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            type="email"
            id="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            name="email"
            autoComplete="email"
          />
          <label className="form-label" htmlFor="email">Your Email</label>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mb-4">
        <div className="form-outline flex-fill mb-0">
          <input
            type="text"
            id="phoneNumber"
            className="form-control"
            value={formData.phoneNumber}
            onChange={handleChange}
            name="phoneNumber"
          />
          <label className="form-label" htmlFor="phoneNumber">Phone Number</label>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-home fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            type="text"
            id="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            name="address"
          />
          <label className="form-label" htmlFor="address">Address</label>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <input
            type="password"
            id="currentPassword"
            className="form-control"
            value={formData.currentPassword}
            onChange={handleChange}
            name="currentPassword"
          />
          <label className="form-label" htmlFor="currentPassword">Current Password</label>
        </div>
      </div>
      <div className="d-flex flex-row align-items-center mb-4">
        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
        <div className="form-outline flex-fill mb-0">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setShowPasswordFields(!showPasswordFields)}
          >
            {showPasswordFields ? "Cancel Password Change" : "Change Password"}
          </button>
        </div>
      </div>

      {showPasswordFields && (
        <>
          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="password"
                id="currentPassword"
                className="form-control"
                value={formData.currentPassword}
                onChange={handleChange}
                name="currentPassword"
                placeholder="Current Password"
                required={showPasswordFields}
              />
              <label className="form-label" htmlFor="currentPassword">Current Password</label>
            </div>
          </div>

          <div className="d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
            <div className="form-outline flex-fill mb-0">
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
                name="newPassword"
                placeholder="New Password"
                required={showPasswordFields}
              />
              <label className="form-label" htmlFor="newPassword">New Password</label>
            </div>
          </div>
        </>
      )}

      <div className="text-center text-lg-start mt-4 pt-2">
        <button 
          type="submit" 
          className="btn btn-primary btn-lg"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}

export default UpdateForm;
