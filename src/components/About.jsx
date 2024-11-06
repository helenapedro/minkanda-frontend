import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const About = () => {
  return (
    <Container >
      <Card className="text-center mt-4 p-4 shadow" style={{ maxWidth: '600px', margin: '0 auto', borderRadius: '8px' }}>
        <Card.Header as="h3" style={{ backgroundColor: '#54B4D3', color: '#fff', borderRadius: '8px 8px 0 0' }}
          >About This Application
        </Card.Header>
        <Card.Body>
          <Card.Text>
            Welcome to the app <strong>Minkanda</strong> (a kikongo word that means "Notes")! This application helps you manage your personal and public notes with ease.
          </Card.Text>
          <hr />

          <Card.Text as="h5" className="mt-4">Login Information for Testing</Card.Text>
          <div className="p-3 bg-light rounded mb-3">
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Email:</strong> minkanda-notes@mtcambrosio.com
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Password:</strong> Minkanda4321
              </ListGroup.Item>
            </ListGroup>
          </div>
          <Button variant="primary" href="/login" className="mb-3">
            Go to Login
          </Button>
          <Card.Text>
            If you're only here for testing, feel free to use the credentials above. 
            However, if you'd like to create your own account, you're welcome to sign up.
          </Card.Text>
          <hr />

          <Card.Text className="mt-4">
            For any support inquiries, please send an email to  
            <a href="mailto:minkanda-notes@mtcambrosio.com"> minkanda-notes@mtcambrosio.com</a>.
          </Card.Text>
        </Card.Body>
      </Card>

    </Container>
  );
};

export default About;
