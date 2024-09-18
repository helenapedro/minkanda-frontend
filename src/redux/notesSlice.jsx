import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotes, fetchNoteById, fetchPublicNotes, addNote, updateNote, deleteNote } from '../services/api';

export const fetchNotesAsync = createAsyncThunk(
  'notes/fetchNotes', 
  async (page = 0) => {
    const response = await fetchNotes(page);
    return response;
  }
);

export const fetchPublicNotesAsync = createAsyncThunk(
  'notes/fetchPublicNotes',
  async (page = 0) => {
    const response = await fetchPublicNotes(page);
    return response;
  }
);

export const fetchNoteByIdAsync = createAsyncThunk(
  'notes/fetchNoteById',
  async (nid) => {
    const response = await fetchNoteById(nid);
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
  'notes/updateNote', 
  async ({ nid, ...restOfNote }) => {
    const response = await updateNote(nid, { nid, ...restOfNote });
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
    selectedNote: null,
    loading: false,
    error: null,
    totalPages: 0,
    publicTotalPages: 0,
    updateNoteStatus: 'idle',
  },
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateNoteStatus = 'idle';
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload.content;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchPublicNotesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicNotesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.publicNotes = action.payload.content;
        state.publicTotalPages = action.payload.totalPages;
      })
      .addCase(fetchPublicNotesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchNoteByIdAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNoteByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNote = action.payload;
      })
      .addCase(fetchNoteByIdAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addNoteAsync.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(addNoteAsync.rejected, (state, action) => {
        state.error = action.error.message;
      })

      .addCase(updateNoteAsync.pending, (state) => {
        state.updateNoteStatus = 'pending'; 
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        state.updateNoteStatus = 'fulfilled';
        const index = state.notes.findIndex((note) => note.nid === action.payload.nid);
        if (index !== -1) {
          state.notes[index] = action.payload;
        } else {
          console.warn('Note not found in state for update:', action.payload.nid);
        }
      })
      .addCase(updateNoteAsync.rejected, (state, action) => {
        state.updateNoteStatus = 'rejected';
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

export const { resetUpdateStatus, clearSelectedNote } = notesSlice.actions;

export default notesSlice.reducer;
