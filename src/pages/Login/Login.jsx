import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/auth';
import styles from './Login.module.css';
import loginForm from '../../forms/loginForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token);
      navigate('/notes'); 
    } catch (err) {
      console.log(err)
      setError('Network error, please try again.');
    }
  };

  return (
    <section className="vh-100">
      <div className={`${styles.divider} ${styles.hCustom} container-fluid h-100`}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-5 col-lg-6 col-xl-5">
            <p className='h2 text-center'>Welcome to the Notes App</p>
            <p className='lead text-center'>Create, manage, and access your notes securely.</p>
            <img 
              src="./hero.webp"
              className={`${styles['img-fluid ']} img-fluid w-100`}
              alt=""
            />
          </div>
          <div className="col-md-7 col-lg-6 col-xl-4">
            <h2 className="text-center">Login</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {loginForm(handleSubmit, email, setEmail, password, setPassword)}
          </div>
        </div>
        <div className={`${styles.copyright} flex-md-row text-md-start py-4 px-4 px-xl-5`}>
          <div className={`${styles.color} mb-3 mb-md-0`}>
            Copyright © 2024. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;