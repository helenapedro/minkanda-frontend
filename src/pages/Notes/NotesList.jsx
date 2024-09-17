import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import NoteDetailsCard from '../../components/notes/NoteDetailsCard';
import { fetchNotes } from '../../services/api'; 
import { useDispatch, useSelector } from 'react-redux';
import { CiSearch } from 'react-icons/ci';
import { MdClose } from 'react-icons/md';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);

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

  /* const handleSearch = useCallback( () => {
    if (text.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [text, notes]);

  useEffect(() => {
    handleSearch();
  }, [text, notes, handleSearch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  } */

    return (
      <div className="notes-list">
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
          <span>Showing {notes.length} notes per page</span>
        </div>
  
        {notes.map(note => (
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
