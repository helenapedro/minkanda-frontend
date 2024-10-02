import Gender from './Gender';
import NameForm from './NameForm';
import PasswordForm from './PasswordForm';
import ContactForm from './ContactForm';

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
        <div className="col">
          <Gender gender={gender} setGender={setGender} />
          <div className="form-outline flex-fill mb-2">
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
          <ContactForm formData={formData} handleChange={handleChange} />
        </div>
        <PasswordForm 
          formData={formData} 
          handleChange={handleChange} 
          showPasswordFields={showPasswordFields} 
          setShowPasswordFields={setShowPasswordFields} 
        />
        <div className="text-center pt-2">
          <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}
          > {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
     
    </form>
  );
}

export default UpdateForm;
