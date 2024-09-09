import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotes, addNote, updateNote, deleteNote } from '../services/api';

// Async actions using createAsyncThunk
export const fetchNotesAsync = createAsyncThunk(
  'notes/fetchNotes', 
  async () => {
    const response = await fetchNotes();
    console.log('Fetched Notes:', response);
    return response;
  }
);

export const addNoteAsync = createAsyncThunk(
  'notes/addNote', async (note) => {
    const response = await addNote(note);
    return response;
  }
);

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNote', async ({ nid, note }) => {
    const response = await updateNote(nid, note);
    return response;
  }
);

export const deleteNoteAsync = createAsyncThunk(
  'notes/deleteNote', 
  async (nid) => {
    await deleteNote(nid);
    return nid;
  }
);

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
        state.notes = action.payload.content;
      })
      .addCase(fetchNotesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(addNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        const index = state.notes.findIndex((note) => note.nid === action.payload.nid);
        if (index !== -1) state.notes[index] = action.payload;
      })
      .addCase(updateNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.nid !== action.payload);
      })
      .addCase(deleteNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default notesSlice.reducer;
