import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import NoteCard from './NoteCard';

const NotesList = ({ notes, isPublic }) => {
  const dispatch = useDispatch();
  const [sortedNotes, setSortedNotes] = useState([...notes]);
  const [sortOption, setSortOption] = useState('Newest');

  useEffect(() => {
    const sorted = [...notes].sort((a, b) => {
      if (sortOption === 'Newest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    setSortedNotes(sorted);
  }, [notes, sortOption]);

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSortOption('Newest')}>Newest</Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOption('Oldest')}>Oldest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {sortedNotes.map((note) => (
        <NoteCard key={note.nid} note={note} isPublic={isPublic} />
      ))}
    </>
  );
};

export default NotesList;
