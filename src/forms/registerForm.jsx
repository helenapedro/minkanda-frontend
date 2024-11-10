import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';

const RegisterForm = ({
     handleSubmit, 
     email, setEmail, 
     password, setPassword, 
     firstname, setFirstname,
     lastname, setLastname,
     isLoading
}) => {
     const [confirmPassword, setConfirmPassword] = useState('');
     const [passwordMatchError, setPasswordMatchError] = useState('');

     const handlePasswordChange = (e) => {
          setPassword(e.target.value);
          if (confirmPassword !== e.target.value) {
               setPasswordMatchError('Passwords do not match');
          } else {
               setPasswordMatchError('');
          }
     };

     const handleConfirmPasswordChange = (e) => {
          setConfirmPassword(e.target.value);
          if (password !== e.target.value) {
               setPasswordMatchError('Passwords do not match');
          } else {
               setPasswordMatchError('');
          }
     };

     return (
          <Container>
               <Form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                    <Row>
                         <Col md={6} className="mb-4">
                              <Form.Group controlId="firstname">
                                   <Form.Label>First Name</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        value={firstname}
                                        onChange={(e) => setFirstname(e.target.value)}
                                        required
                                        autoComplete="given-name"
                                   />
                              </Form.Group>
                         </Col>
                         <Col md={6} className="mb-4">
                              <Form.Group controlId="lastname">
                                   <Form.Label>Last Name</Form.Label>
                                   <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        required
                                        autoComplete="family-name"
                                   />
                              </Form.Group>
                         </Col>
                    </Row>
                    <Form.Group className="mb-4" controlId="email">
                         <Form.Label>Email</Form.Label>
                         <Form.Control
                              type="email"
                              placeholder="Your Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                              autoComplete="email"
                         />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                         <Form.Label>Password</Form.Label>
                         <Form.Control
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={handlePasswordChange}
                              required
                              autoComplete="new-password"
                         />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="confirmPassword">
                         <Form.Label>Confirm Password</Form.Label>
                         <Form.Control
                              type="password"
                              placeholder="Confirm Password"
                              value={confirmPassword}
                              onChange={handleConfirmPasswordChange}
                              required
                         />
                         {passwordMatchError && <Form.Text className="text-danger">{passwordMatchError}</Form.Text>}
                    </Form.Group>
                    <div className="text-center text-lg-start mt-4 pt-2">
                         <Button 
                              type="submit" 
                              variant="primary" 
                              size="lg" 
                              disabled={isLoading || passwordMatchError !== ''}
                         >
                              {isLoading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Register'}
                         </Button>
                    </div>
               </Form>
          </Container>
     );
};

export default RegisterForm;
