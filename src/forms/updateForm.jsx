import Gender from './Gender';
import NameForm from './NameForm';
import PasswordForm from './PasswordForm';

const UpdateForm = ({handleSubmit, formData, handleChange, gender, setGender, showPasswordFields, setShowPasswordFields, isLoading}) => {
  return (
    <form className='mx-1 mx-md-4' onSubmit={handleSubmit}>
      <NameForm formData={formData} handleChange={handleChange} />
      <div className='row mb-4'>
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
        <div className="col mb-4">
          <Gender gender={gender} setGender={setGender} />
          
          <div className="form-outline flex-fill mb-4">
            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
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

          <div className="form-outline flex-fill mb-4">
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

          <div className="form-outline flex-fill mb-4">
            <i className="fas fa-home fa-lg me-3 fa-fw"></i>
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
        <PasswordForm 
          formData={formData} 
          handleChange={handleChange} 
          showPasswordFields={showPasswordFields} 
          setShowPasswordFields={setShowPasswordFields} 
        />
      </div>
     
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
