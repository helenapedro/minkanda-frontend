const NameForm = ({ formData, handleChange }) => {
     return (
        <div className='row mb-4'>
          <div className="col">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div data-mdb-input-init className="form-outline">
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
          <div className="col">
            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
            <div className="form-outline">
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
     );
}

export default NameForm;