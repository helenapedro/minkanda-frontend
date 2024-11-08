import React from 'react';
import MainScreen from '../components/MainScreen';
import useNotes from '../actions/useNotes';
import NotesList from '../components/notes/NotesList';

const PrivateNotes = () => {
  const { notes, loading, error, page, setPage, totalPages, pageSize, handlePageSizeChange } = useNotes(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const pageControls = {
    page,
    totalPages,
    handlePreviousPage: () => setPage((prev) => Math.max(prev - 1, 0)),
    handleNextPage: () => setPage((prev) => Math.min(prev + 1, totalPages - 1)),
    pageSize,
    handlePageSizeChange
  };

  return (
    <MainScreen title="My Notes">
      <NotesList notes={notes} title="Private Notes" isPublic={false} pageControls={pageControls} />
    </MainScreen>
  );
};

export default PrivateNotes;
