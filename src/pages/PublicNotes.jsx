import React,  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncedSearch } from '../utils/search';
import SearchForm from '../forms/searchForm';
import { fetchPublicNotesList } from '../services/notes';
import PublicNotesDetailsCard from '../components/notes/PublicNotesDetailsCard';
import { getPaginationControls } from '../utils/pagination';
import PaginationLayout from '../components/common/PaginationLayout';
import notesStyles from '../styles/NotesList.module.css';

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
     const navigate = useNavigate();

     useEffect(() => {
          fetchPublicNotesList(page, pageSize, setNotes, setTotalPages, setError)
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
   
     if (loading) return <p>Loading public notes...</p>;
     if (error) return <p>{error}</p>;

     return (
          <div className={`${notesStyles['notes-list']} container`}>
            <div className={`${notesStyles.card} card`}>
              <div className={`${notesStyles['card-body']} card-body`}>
                <div className={notesStyles.actions}>
                  <SearchForm
                    text={text}
                    setText={setText}
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                  />
                  <button className='btn btn-outline-secondary' onClick={() => navigate("/notes/")}>
                    My Notes
                  </button> 
                </div>
              </div>
            </div>
      
            {filteredNotes.length === 0 ? (
              <div>No notes match your search criteria.</div>
            ) : (
              filteredNotes.map((note) => <PublicNotesDetailsCard key={note.nid} note={note} />)
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
   
export default PublicNotes; 