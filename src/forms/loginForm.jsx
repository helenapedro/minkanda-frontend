import styles from './Forms.module.css';

const loginForm = (handleLogin, email, setEmail, password, setPassword) => {
     return (
          <form onSubmit={handleLogin}>
               <div className="form-outline mb-4">
                    <input
                         type="email"
                         className="form-control form-control-lg"
                         id="form3Example3"
                         placeholder="Email address"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         required
                         autoComplete="email"
                    />
               </div>
               <div className="form-outline mb-3">
                    <input
                    type="password"
                    className="form-control form-control-lg"
                    id="form3Example4"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    />
               </div>
               <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                         <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                         <label className="form-check-label" htmlFor="form2Example3">
                              Remember me
                         </label>
                    </div>
                    <a href="/login" className="text-body">Forgot password?</a>
               </div>
               <div className="text-center text-lg-start mt-4 pt-2">
                    <button type="submit" className={`${styles.button} btn btn-primary btn-lg`}> Login </button>
                    <p 
                    className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? 
                    <a href="/register" className="link-danger">Register</a>
                    </p>
               </div>
          </form>

     );
};

export default loginForm;