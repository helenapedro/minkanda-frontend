import React from 'react';
import { MdClose } from 'react-icons/md';
import { CiSearch } from 'react-icons/ci';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SearchForm = ({ text, setText, showSearch, setShowSearch }) => {
  return (
    <>
      {showSearch ? (
        <Form>
          <Form.Group  style={{ display: 'flex', marginRight: '0.5rem' }}>
            <Form.Control
              type="text"
              placeholder="Search by title..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              onClick={() => {
                setShowSearch(false);
                setText('');
              }}
            >
              <MdClose />
            </Button>
          </Form.Group>
        </Form>
      ) : (
        <Form>
          <Form.Group>
            <Button
              variant="outline-secondary"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch /> Search
            </Button>
          </Form.Group>
        </Form>
      )}
    </>
  );
};

export default SearchForm;
