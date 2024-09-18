import { debounce } from './debounce';

export const useDebouncedSearch = (notes, text, setFilteredNotes) => {
  const handleSearch = debounce(() => {
    if (text.trim() === '') {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(note =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, 500); // 500ms delay for debounce

  return handleSearch;
};