import { Container, Form, Button, Spinner } from 'react-bootstrap';

function NoteForm({ title, setTitle, body, setBody, isPublic, setIsPublic, handleSubmit, isLoading }) {
  return (
    <Container>
      <h2>Add New Note</h2>
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
    </Container>
  );
}

export default NoteForm;
