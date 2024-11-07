import React, { useState, useEffect } from 'react';
import { useDebouncedSearch } from '../utils/search';
import useNotes from '../actions/useNotes';
import SearchForm from '../forms/searchForm';
import PaginationLayout from '../components/common/PaginationLayout';
import MainScreen from '../components/MainScreen';
import NoteCard from '../components/notes/NoteCard';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import notesStyles from '../styles/NotesList.module.css';

const PrivateNotes = () => {
  const { notes, loading, error, page, setPage, totalPages, pageSize, handlePageSizeChange } = useNotes(false);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const handleSearch = useDebouncedSearch(notes, text, setFilteredNotes);

  useEffect(() => {
    handleSearch();
  }, [text, notes, handleSearch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <MainScreen title="Private Notes">
      <Container>
        <Card style={{ marginBottom: '1rem' }}>
          <Card.Body>
            <div className={notesStyles.actions}>
              <SearchForm text={text} setText={setText} showSearch={showSearch} setShowSearch={setShowSearch} />
              <Button variant="outline-secondary" onClick={() => setSortByDate(!sortByDate)}>Sort by Date</Button>
            </div>
          </Card.Body>
        </Card>
        {filteredNotes.length === 0 ? (
          <div>No notes match your search criteria.</div>
        ) : (
          <Row xs={1} md={2}>
            {filteredNotes
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortByDate ? dateB - dateA : dateA - dateB;
              })
              .map((note) => (
                <Col key={note.nid}>
                  <NoteCard note={note} isPublic={false} />
                </Col>
              ))}
          </Row>
        )}
        <PaginationLayout
          page={page}
          totalPages={totalPages}
          handlePreviousPage={() => setPage((prev) => Math.max(prev - 1, 0))}
          handleNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          pageSize={pageSize}
          handlePageSizeChange={handlePageSizeChange}
        />
      </Container>
    </MainScreen>
  );
};

export default PrivateNotes;
