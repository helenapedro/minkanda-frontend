const PasswordForm = ({ formData, handleChange, showPasswordFields, setShowPasswordFields }) => {
     return (
          <div className="row">
               <div className="col">
                    <div className="form-outline flex-fill">
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
               <div className="col">
                    <div className="form-outline flex-fill">
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

                    <div className="d-flex flex-row align-items-center">
                         <div className="form-outline flex-fill">
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
          </div>
     );
}

export default PasswordForm;