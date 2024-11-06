import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUserAsync } from '../../redux/userSlice';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import loginForm from '../../forms/loginForm';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const resultAction = await dispatch(loginUserAsync({ email, password })).unwrap();

      if (resultAction && resultAction.token) {
        localStorage.setItem('token', resultAction.token);
        navigate('/notes');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };
  
  {/* <section className="d-flex align-items-center vh-100 bg-light">
  </section> */}
  return (
    <Container>
      <Row className="justify-content-center align-items-center">
        <Col md={5} lg={6} className="text-center mb-4">
          <h1 className="h2">Minkanda</h1>
          <p className="lead">Create, manage, and access your private and public notes securely.</p>
          <img 
            src="./hero.webp"
            className="img-fluid w-100"
            alt="Login Illustration"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={7} lg={6} xl={4}>
          <h2 className="text-center mb-4">Login</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          {loginForm(handleSubmit, email, setEmail, password, setPassword, isLoading)}
        </Col>
      </Row>
      <footer className="text-center py-3 mt-4" style={{ backgroundColor: '#9fa6b2', color: '#ffffff' }}>
        <small>© 2024. All rights reserved.</small>
      </footer>
    </Container>
  );
};

export default Login;
