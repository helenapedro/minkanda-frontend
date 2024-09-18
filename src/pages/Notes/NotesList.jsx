import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';
import { useDebouncedSearch } from '../../utils/search';
import { fetchNotesList } from '../../services/notes';
import { getPaginationControls } from '../../utils/pagination';
import SearchForm from './../../forms/searchForm';
import PaginationLayout from '../../components/notes/PaginationLayout';
import LogoutButton from '../../components/LogoutButton';

import notesStyles from '../../styles/NotesList.module.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showSearch, setShowSearch] = useState(false); 
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return ( 
    <div className={`${notesStyles['notes-list']}`}>
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
              <Link to="/notes/add" className="btn btn-success">
                Add Note
              </Link>
              <button className="btn btn-outline-secondary" onClick={() => navigate("/notes/public")}>
                View Public Notes
              </button> 
              <LogoutButton /> 
            </div>
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div>No notes match your search criteria.</div>
      ) : (
        filteredNotes.map((note) => <NoteDetailsCard key={note.nid} note={note} />)
      )}
      
      <PaginationLayout
        page={page}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
        pageSize={pageSize}
        handlePageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default NotesList;
