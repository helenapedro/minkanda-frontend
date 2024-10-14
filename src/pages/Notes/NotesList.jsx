import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedSearch } from '../../utils/search';
import { fetchNotesList } from '../../services/notes';
import { getPaginationControls } from '../../utils/pagination';
import SearchForm from './../../forms/searchForm';
import PaginationLayout from '../../components/common/PaginationLayout';
import MainScreen from '../../components/MainScreen';
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';
import useFetchUserDetails from '../../actions/useFetchUserDetails';
import notesStyles from '../../styles/NotesList.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NotesList = () => {
  const { user, loading: userLoading, error: userError } = useFetchUserDetails(); 
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
    fetchNotesList(page, pageSize, setNotes, setTotalPages, setError)
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  const handleSearch = useDebouncedSearch(notes, text, setFilteredNotes);

  useEffect(() => {
    handleSearch();
  }, [text, notes, handleSearch]);

  const { handleNextPage, handlePreviousPage } = getPaginationControls(page, totalPages, setPage);

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(0);
  };

  if (loading || userLoading) return <div>Loading...</div>;
  if (error || userError) return <div>{error || userError}</div>;

  return (
    <MainScreen title={`Welcome, ${user ? user.firstname : 'Guest'}!`}>
      <div >
        <div className={`${notesStyles.card} card`}>
          <div className={`${notesStyles['card-body']} card-body`}>
            <div className={notesStyles.actions}>
              <SearchForm
                text={text}
                setText={setText}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
              />
              <div className={`${notesStyles['btn-group']} btn-group`}>
                <button className="btn btn-outline-secondary" onClick={() => navigate("/notes/add")}>
                  Create New Note
                </button>  
              </div>
            </div>
          </div>
        </div>
        {filteredNotes.length === 0 ? (
          <div>No notes match your search criteria.</div>
        ) : (
          <Row xs={1} md={cardsPerRow} className="g-4">
            {filteredNotes.map((note) => (
              <Col key={note.nid}>
                <NoteDetailsCard note={note} />
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
        {/* <FloatingButton to="/notes/add"/> */}
      </div>
    </MainScreen> 
  );
};

export default NotesList;
