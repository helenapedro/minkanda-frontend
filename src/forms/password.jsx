import React from 'react';

const password = ({ password, setPassword,}) => {
     return (
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
     );
}

export default password;