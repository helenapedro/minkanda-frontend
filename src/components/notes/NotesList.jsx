import React, { useState, useEffect } from 'react';
import PaginationLayout from '../common/PaginationLayout';
import NoteCard from './NoteCard';
import * as styles from 'react-bootstrap/';

const NotesList = ({ notes, isPublic, pageControls }) => {
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
    <styles.Col>
      <styles.Dropdown className='mb-3'>
        <styles.Dropdown.Toggle variant="success" id="dropdown-basic">
          Sort By
        </styles.Dropdown.Toggle>
        <styles.Dropdown.Menu>
          <styles.Dropdown.Item onClick={() => setSortOption('Newest')}>Newest</styles.Dropdown.Item>
          <styles.Dropdown.Item onClick={() => setSortOption('Oldest')}>Oldest</styles.Dropdown.Item>
        </styles.Dropdown.Menu>
      </styles.Dropdown>
      {sortedNotes.map((note) => (
        <NoteCard key={note.nid} note={note} isPublic={isPublic} />
      ))}
      <PaginationLayout {...pageControls} />
    </styles.Col>
  );
};

export default NotesList;
