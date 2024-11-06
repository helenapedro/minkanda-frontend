import React from 'react';
import { Container, Form, Button, Spinner, Card } from 'react-bootstrap';

const loginForm = (handleSubmit, email, setEmail, password, setPassword, isLoading) => {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form onSubmit={handleSubmit} className="p-4 shadow-sm rounded" style={{ maxWidth: '400px', width: '100%' }}>
        <Form.Group controlId="formBasicEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
        <Card.Text className="text-center mt-3">
          <small className="text-muted">
            Don't have an account? <a href="/register" className="text-danger">Register</a>
          </small>
        </Card.Text>
      </Form>
    </Container>
  );
};

export default loginForm;
