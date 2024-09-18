import { fetchNotes } from './api';
import { fetchNotesBase } from '../utils/fetchNotesBase';
import { fetchNotesData } from '../utils/fetchNotesData';

// Fetch private notes
export const fetchNotesList = async (
  page, 
  pageSize, 
  setNotes,  
  setTotalPages, 
  setError
) => {
  await fetchNotesData(fetchNotes, page, pageSize, setNotes, setTotalPages, setError);
};

// Fetch public notes
export const fetchPublicNotesList = async (
  page, 
  pageSize, 
  setNotes, 
  setTotalPages, 
  setError
) => {
  const fetchPublicNotes = (page, pageSize) => fetchNotesBase('/notes/public', page, pageSize);
  await fetchNotesData(fetchPublicNotes, page, pageSize, setNotes, setTotalPages, setError);
};
