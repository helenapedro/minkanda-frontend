import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotes, addNote, updateNote, deleteNote } from '../services/api';

// Async actions using createAsyncThunk
export const fetchNotesAsync = createAsyncThunk('notes/fetchNotes', async () => {
  const response = await fetchNotes();
  return response; // Return response directly as data is already in desired format
});

export const addNoteAsync = createAsyncThunk('notes/addNote', async (note) => {
  const response = await addNote(note);
  return response;
});

export const updateNoteAsync = createAsyncThunk('notes/updateNote', async ({ id, note }) => {
  const response = await updateNote(id, note);
  return response;
});

export const deleteNoteAsync = createAsyncThunk('notes/deleteNote', async (id) => {
  await deleteNote(id);
  return id;
});

// Create a slice for notes
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) state.notes[index] = action.payload;
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
      });
  },
});

export default notesSlice.reducer;
