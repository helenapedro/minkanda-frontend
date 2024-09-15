import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchNotesAsync } from '../../redux/notesSlice'; 
import { fetchNotes } from '../../services/api'; 
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';

import { CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const NotesList = () => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showSearch, setShowSearch] = useState(false);

  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

   // Pagination state
  const [page, setPage] = useState(0); 
  const [totalPages, setTotalPages] = useState(1); 
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const getNotes = async () => {
      setLoading(true);
      try {
        const fetchedNotes = await fetchNotes(page, pageSize);
        console.log('Fetched Notes:', fetchedNotes);

        if (fetchedNotes && fetchedNotes.content && Array.isArray(fetchedNotes.content)) {
          setNotes(fetchedNotes.content);
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

  const handleSearch = () => {
    if (text.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [text, notes]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


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

      {notes.map((note) => (
        <NoteDetailsCard key={note.nid} note={note} />
      ))}

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
