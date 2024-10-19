import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const UserDetailsForm = ({ user }) => {
  return (
    <Form className="mx-3">
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="firstname">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text" value={user?.firstname || ''} readOnly />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" value={user?.lastname || ''} readOnly />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={14}>
          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={user?.email || ''} readOnly />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="birthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control type="text" value={new Date(user?.birthday || '').toLocaleDateString()} readOnly />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="gender">
            <Form.Label>Gender:</Form.Label>
            <Form.Control type="text" value={user?.gender || ''} readOnly />
          </Form.Group>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="address">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" value={user?.address || ''} readOnly />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text" value={user?.phoneNumber || ''} readOnly />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default UserDetailsForm;
