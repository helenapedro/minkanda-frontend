import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserAsync } from '../redux/userSlice'; 
import UserDetails from '../components/user/UserDetails'; 
import { Spinner, Alert, Card, Container, Row, Col } from 'react-bootstrap';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getCurrentUserAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="justify-content-center w-100">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Header as="h5" className="d-flex text-white justify-content-between align-items-center bg-primary">
              {userInfo.firstname}'s Profile
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : error ? (
                <Alert variant="danger" className="text-center">
                  {error}
                </Alert>
              ) : (
                <UserDetails user={userInfo} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserProfile;
