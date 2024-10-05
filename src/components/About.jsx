import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const About = () => {
  return (
    <Card className="text-center mt-4" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Card.Header as="h3">About This Application</Card.Header>
      <Card.Body>
        <Card.Text>
          Welcome to the app Minkanda (a kikongo word that means "Notes")! This application helps you manage your personal and public notes with ease.
        </Card.Text>

        <Card.Title as="h5">Login Information for Testing</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <strong>Email:</strong> test@test.com
          </ListGroup.Item>
          <ListGroup.Item>
            <strong>Password:</strong> Test4321
          </ListGroup.Item>
        </ListGroup>

        <Card.Text className="mt-4">
          If you're only here for testing, feel free to use the credentials above. 
          However, if you'd like to create your own account, you're welcome to sign up and start managing your own notes!
        </Card.Text>

        <Card.Text className="mt-4">
          For any support inquiries, please send an email to <a href="mailto:minkanda@mtcambrosio.com">minkanda@mtcambrosio.com</a>.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default About;
