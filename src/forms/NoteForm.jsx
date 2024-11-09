import ReturnButton from '../components/common/ReturnButton';
import { Container, Card, Form, Button, Spinner, CardBody } from 'react-bootstrap';

function NoteForm({ title, setTitle, body, setBody, isPublic, setIsPublic, handleSubmit, isLoading }) {
  return (
    <Container >
      <Card className='mt-5 shadow-sm' style={{ maxWidth: '800px', width: '100%', margin: '0 auto', borderRadius: '8px' }}>
        <Card.Header className="d-flex justify-content-between align-items-center p-3 rounded-top">
                <h2 className="mb-0 ms-2">Add New Note</h2>
                <ReturnButton url="/notes" className="me-2" />
        </Card.Header>
        <CardBody>

          <Form>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="public">
              <Form.Check
                type="checkbox"
                label="Public"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Save'}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default NoteForm;
