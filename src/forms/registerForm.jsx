import Gender from './Gender';
import styles from './Forms.module.css';

const registerForm = (
     handleSubmit, 
     email, 
     setEmail, 
     password, 
     setPassword, 
     firstname, 
     setFirstname,
     lastname,
     setLastname,
     birthday,
     setBirthday,
     gender,
     setGender,
     phoneNumber,
     setPhoneNumber,
     address,
     setAddress,
     isLoading
) => {
     return (
          <form className='mx-1 mx-md-4' onSubmit={handleSubmit}>
               <div className='row'>
                    <div className="col-md-6 mb-4">
                         <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                         <div data-mdb-input-init className="form-outline flex-fill mb-0">
                              <input
                              type="text"
                              id="form3Example1c"
                              placeholder="First Name"
                              className="form-control"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                              required
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
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                              required
                              autoComplete="family-name"
                              />
                         </div>
                    </div>
               </div>
               <div  className='row'>
                    <div className="col-md-6 mb-4 align-items-center">
                         <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                         <div className="form-outline datepicker w-100">
                              <input
                              type="date"
                              id="birthdayDate"
                              className="form-control form-control-lg"
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                              required
                              />
                              <label className="form-label" htmlFor="birthdayDate">Birthday</label>
                         </div>  
                    </div>
                    <Gender gender={gender} setGender={setGender} />
               </div>
               <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                         <input
                              type="email"
                              id="email"
                              className="form-control"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              autoComplete="email"
                         />
                         <label className="form-label" htmlFor="email">Your Email</label>
                    </div>
               </div>
               <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                         <input
                              type="password"
                              id="password"
                              className="form-control"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                              autoComplete="new-password"
                         />
                         <label className="form-label" htmlFor="password">Password</label>
                    </div>
               </div>
               <div className="d-flex flex-row align-items-center mb-4">
                    <i className="fas fa-phone fa-lg me-3 fa-fw"></i>
                    <div className="form-outline flex-fill mb-0">
                         <input
                         type="tel"
                         id="phoneNumber"
                         className="form-control"
                         placeholder="Phone Number"
                         value={phoneNumber}
                         onChange={(e) => setPhoneNumber(e.target.value)}
                         autoComplete="tel"
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
                         placeholder="Address"
                         value={address}
                         onChange={(e) => setAddress(e.target.value)}
                         required
                         autoComplete="address-line1"
                         />
                         <label className="form-label" htmlFor="address">Address</label>
                    </div>
               </div>
               <div className="text-center text-lg-start mt-4 pt-2">
                    <button 
                         type="submit" 
                         className={`${styles.button} btn btn-primary btn-lg`}  
                         disabled={isLoading}
                    >
                         {isLoading ? 'Registering' : 'Register'}
                    </button>
               </div>
          </form> 
     );
}

export default registerForm;