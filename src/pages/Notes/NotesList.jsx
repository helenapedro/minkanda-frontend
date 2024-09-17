import React, { useEffect, useState, useCallback } from 'react';
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';
import { fetchNotes } from '../../services/api';
import { debounce } from '../../utils/debounce';
import { CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const fetchedNotes = await fetchNotes(page, pageSize);
        if (fetchedNotes && fetchedNotes.content) {
          setNotes(fetchedNotes.content);
          setFilteredNotes(fetchedNotes.content);
          setTotalPages(fetchedNotes.totalPages);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (err) {
        setError('Failed to fetch notes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getNotes();
  }, [page, pageSize]);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPage(0); // Reset to first page when page size changes
  };

  const handleSearch = useCallback(
    debounce(() => {
      if (text.trim() === '') {
        setFilteredNotes(notes);
      } else {
        const filtered = notes.filter(note =>
          note.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredNotes(filtered);
      }
    }, 500), // 500ms delay for debounce
    [text, notes]
  );

  useEffect(() => {
    handleSearch();
  }, [text, notes, handleSearch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="notes-list">
      {/* Search and Add Note UI */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {text ? (
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
                setText('');
                setFilteredNotes(notes); // Reset to all notes
              }}
            >
              <MdClose />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-outline-secondary me-2"
              onClick={() => setText('')}
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
        <span>Showing {filteredNotes.length} notes per page</span>
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page === 0}>
          Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default NotesList;
