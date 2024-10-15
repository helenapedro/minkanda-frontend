import React, { useEffect, useState } from 'react';
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
import MainScreen from '../components/MainScreen';


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
  const [sortByDate, setSortByDate] = useState(false);

  useEffect(() => {
    fetchPublicNotesList(page, pageSize, setNotes, setTotalPages, setError)
      .finally(() => setLoading(false));
  }, [page, pageSize, sortByDate]);

  const handleSearch = useDebouncedSearch(notes, text, setFilteredNotes);

  useEffect(() => {
    handleSearch();
  }, [text, notes, handleSearch]);

  const { handleNextPage, handlePreviousPage } = getPaginationControls(
    page, totalPages, setPage
  );

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  };

  if (loading) return <p>Loading public notes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MainScreen title='Public Notes'>
      <Container>
        <Card style={{ marginBottom: '1rem'}}>
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
                onClick={() => {setSortByDate(!sortByDate)}}
                >
                  Sort by Date
              </Button>
              {/* <Button 
                variant="outline-secondary" 
                onClick={() => navigate("/notes/")}
                > My Notes
              </Button> */}
            </div>
          </Card.Body>
        </Card>

        {filteredNotes.length === 0 ? (
          <div>No notes match your search criteria.</div>
        ) : (
          <Row xs={1} md={cardsPerRow} >
            {filteredNotes
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return sortByDate ? dateB - dateA : dateA - dateB;
              })
              .map((note) => (
                <Col key={note.nid}>
                  <NoteCard note={note} isPublic={true} />
                </Col>
              ))
            }
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
    </MainScreen>
  );
};

export default PublicNotes;