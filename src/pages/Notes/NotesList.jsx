import React, { useEffect, useState } from 'react';
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';
import { useDebouncedSearch } from '../../utils/search';
import { fetchNotesList } from '../../services/notes';
import { getPaginationControls } from '../../utils/pagination';
import { CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

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
    setPage(0); // Reset to first page when page size changes
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="notes-list">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {showSearch ? (
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                setShowSearch(false);
                setText('');
              }}
            >
              <MdClose />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => setShowSearch(true)}
            >
              <CiSearch /> Search
            </button>
            <Link to="/notes/add" className="btn btn-success">
              Add Note
            </Link>
          </div>
        )}
      </div>

      {filteredNotes.length === 0 ? (
        <div>No notes match your search criteria.</div>
      ) : (
        filteredNotes.map((note) => <NoteDetailsCard key={note.nid} note={note} />)
      )}

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>

      <div className="pagination-controls mb-3">
        <label htmlFor="pageSize" className="me-2">Notes per page:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="pagination-info">
        <span>Showing {pageSize} notes per page</span>
      </div>
    </div>
  );
};

export default NotesList;
