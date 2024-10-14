import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedSearch } from '../utils/search';
import SearchForm from '../forms/searchForm';
import { fetchPublicNotesList } from '../services/notes';
import NoteCard from '../components/notes/NoteCard';
import { getPaginationControls } from '../utils/pagination';
import PaginationLayout from '../components/common/PaginationLayout';
import notesStyles from '../styles/NotesList.module.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 


const PublicNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showSearch, setShowSearch] = useState(false);
  const [cardsPerRow, setCardsPerRow] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicNotesList(page, pageSize, setNotes, setTotalPages, setError)
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  const handleSearch = useDebouncedSearch(notes, text, setFilteredNotes);

  useEffect(() => {
    handleSearch();
  }, [text, notes, handleSearch]);

  const { handleNextPage, handlePreviousPage } = getPaginationControls(
    page,
    totalPages,
    setPage
  );

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  };

  if (loading) return <p>Loading public notes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Card className="mt-5" style={{ borderRadius: '10px', marginBottom: '1rem', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <Card.Body>
          <div className={notesStyles.actions}>
            <SearchForm
              text={text}
              setText={setText}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
            />
            <Button 
              variant="outline-secondary" 
              onClick={() => navigate("/notes/")}
              > My Notes
            </Button>
          </div>
        </Card.Body>
      </Card>

      {filteredNotes.length === 0 ? (
        <div>No notes match your search criteria.</div>
      ) : (
        <Row xs={1} md={cardsPerRow} >
          {filteredNotes.map((note) => (
            <Col key={note.nid}>
              <NoteCard note={note} isPublic={true} />
            </Col>
          ))}
        </Row>
      )}
      <PaginationLayout
        page={page}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
    </Container>
  );
};

export default PublicNotes;