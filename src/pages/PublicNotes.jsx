import React from 'react';
import useNotes from '../actions/useNotes';
import MainScreen from '../components/MainScreen';
import NotesList from '../components/notes/NotesList';

const PublicNotes = () => {
  const { notes, loading, error, page, setPage, totalPages, pageSize, handlePageSizeChange } = useNotes(true);

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
    <MainScreen title="Public Notes">
      <NotesList notes={notes} title="Public Notes" isPublic={true} pageControls={pageControls} />
    </MainScreen>
  );
};

export default PublicNotes;
