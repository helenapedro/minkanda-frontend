import styles from './Forms.module.css';

const updateForm = (
     handleUpdate, 
     firstname, 
     setFirstname,
     lastname,
     setLastname,
     birthday,
     setBirthday,
     phoneNumber,
     setPhoneNumber,
     email, 
     setEmail, 
     address,
     setAddress
) => {
     return (
          <form className='mx-1 mx-md-4' onSubmit={handleUpdate}>
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
                              autoComplete="family-name"
                              />
                         </div>
                    </div>
               </div>
               <div  className='row'>
                    <div className="col-md-6 mb-4 d-flex align-items-center">
                         <i className="fas fa-calendar fa-lg me-3 fa-fw"></i>
                         <div className="form-outline datepicker w-100">
                              <input
                              type="date"
                              id="birthdayDate"
                              className="form-control form-control-lg"
                              value={birthday}
                              onChange={(e) => setBirthday(e.target.value)}
                              />
                              <label className="form-label" htmlFor="birthdayDate">Birthday</label>
                         </div>  
                    </div>
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
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
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
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                         />
                         <label className="form-label" htmlFor="address">Address</label>
                    </div>
               </div>
               <div className="text-center text-lg-start mt-4 pt-2">
               <button type="submit" className={`${styles.button} btn btn-primary btn-lg`}>Save Changes</button>
          </div>
        </form> 
     );
}

export default updateForm;