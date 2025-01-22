import ReturnButton from '../components/common/ReturnButton';
import { Container, Card, Form, Button, Spinner, CardBody, Tooltip, OverlayTrigger } from 'react-bootstrap';

function NoteForm({ title, setTitle, body, setBody, isPublic, setIsPublic, handleSubmit, isLoading }) {

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Check this box if you want the note to be public.
    </Tooltip>
  );

  return (
    <Container >
      <Card className='mt-5 shadow-sm' style={{ maxWidth: '800px', width: '100%', margin: '0 auto', borderRadius: '8px' }}>
        <Card.Header className="d-flex justify-content-between align-items-center p-3 rounded-top bg-primary text-white">
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
                placeholder="Enter the title of your note"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows="10"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write your note here"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="public">
              <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Form.Check
                  type="checkbox"
                  label="Public"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                />
              </OverlayTrigger>
            </Form.Group>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Save Note'}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </Container>
  );
}

export default NoteForm;
