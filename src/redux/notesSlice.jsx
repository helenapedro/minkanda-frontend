import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNotes, fetchNoteById, fetchPublicNotes, addNote, updateNote, toggleNotePrivacy, deleteNote } from '../services/api';
import { setLoadingState, setErrorState, setNotesSuccessState, setPublicNotesSuccessState } from '../utils/stateUtils';

const initialState = {
  notes: [],
  selectedNote: null,
  updateNoteStatus: 'idle',
  totalPages: 0,
  publicTotalPages: 0,
  loading: false,
  error: null,
  successMessage: '',
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateNoteStatus = 'idle';
      state.successMessage = '';
    },
    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = '';
    },
    updateNoteInState: (state, action) => {
      const index = state.notes.findIndex((note) => note.nid === action.payload.nid);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch private notes
    builder
      .addCase(fetchNotesAsync.pending, setLoadingState)
      .addCase(fetchNotesAsync.fulfilled, setNotesSuccessState)
      .addCase(fetchNotesAsync.rejected, setErrorState);

    // Fetch public notes
    builder
      .addCase(fetchPublicNotesAsync.pending, setLoadingState)
      .addCase(fetchPublicNotesAsync.fulfilled, setPublicNotesSuccessState)
      .addCase(fetchPublicNotesAsync.rejected, setErrorState);

    // Fetch note by ID
    builder
      .addCase(fetchNoteByIdAsync.pending, setLoadingState)
      .addCase(fetchNoteByIdAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedNote = action.payload;
      })
      .addCase(fetchNoteByIdAsync.rejected, setErrorState);

    // Add a new note (initially private)
    builder
      .addCase(addNoteAsync.fulfilled, (state, action) => {
        const newNote = action.payload;
        const { nid, ...rest } = newNote;
        state.notes.push({ ...rest, nid, isPublic: false }); 
      })
      .addCase(addNoteAsync.rejected, setErrorState);

    // Update note
    builder
      .addCase(updateNoteAsync.pending, (state) => {
        state.updateNoteStatus = 'pending';
      })
      .addCase(updateNoteAsync.fulfilled, (state, action) => {
        state.updateNoteStatus = 'fulfilled';
        state.selectedNote = action.payload;
        state.successMessage = 'Note updated successfully.';
      })
      .addCase(updateNoteAsync.rejected, (state, action) => {
        state.updateNoteStatus = 'rejected';
        state.error = action.payload;
      });

    // Toggle note privacy
    builder
      .addCase(toggleNotePrivacyAsync.pending, setLoadingState)
      .addCase(toggleNotePrivacyAsync.fulfilled, (state, action) => {
        const updatedNote = action.payload;
        // Update privacy in the selected note
        if (state.selectedNote && state.selectedNote.nid === updatedNote.nid) {
          state.selectedNote.isPublic = updatedNote.isPublic;
        }
        // Update privacy in the notes list
        const noteIndex = state.notes.findIndex((note) => note.nid === updatedNote.nid);
        if (noteIndex !== -1) {
          state.notes[noteIndex].isPublic = updatedNote.isPublic;
        }
        state.successMessage = 'Privacy toggled successfully!';
      })
      .addCase(toggleNotePrivacyAsync.rejected, setErrorState);

    // Delete note
    builder
      .addCase(deleteNoteAsync.fulfilled, (state, action) => {
        state.notes = state.notes.filter((note) => note.nid !== action.payload);
      })
      .addCase(deleteNoteAsync.rejected, setErrorState);
  },
});

// Export async thunks and reducers
export const fetchNotesAsync = createAsyncThunk('notes/fetchNotes', async (page = 0) => {
  const response = await fetchNotes(page);
  return response;
});

export const fetchPublicNotesAsync = createAsyncThunk('notes/fetchPublicNotes', async (page = 0) => {
  const response = await fetchPublicNotes(page);
  return response;
});

export const fetchNoteByIdAsync = createAsyncThunk(
  'notes/fetchNoteById', async (noteId) => {
  const response = await fetchNoteById(noteId);
  return response;
});

export const addNoteAsync = createAsyncThunk(
  'notes/addNote', async (note, {rejectWithValue}) => {
    try {
      return await addNote(note);
    } catch (err) {
      return rejectWithValue(err.response);
    }
});

export const updateNoteAsync = createAsyncThunk(
  'notes/updateNote', 
  async ({ nid, ...noteData }, { rejectWithValue }) => {
    try {
      const response = await updateNote(nid, noteData);
      return response

    } catch (error) {
      return rejectWithValue(error.response?.data || 'Error updating note');
    }
  }
);

export const toggleNotePrivacyAsync = createAsyncThunk(
  'notes/togglePrivacy', 
  async (noteId, { rejectWithValue }) => {
    try {
      const response = await toggleNotePrivacy(noteId);
      return response;
    } 
    catch (error) {
      return rejectWithValue(error.response?.data || 'Error toggling privacy');
    }
  }
);

export const deleteNoteAsync = createAsyncThunk('notes/deleteNote', async (nid) => {
  await deleteNote(nid);
  return nid;
});

export const { resetUpdateStatus, clearSelectedNote, updateNoteInState, clearSuccessMessage } = notesSlice.actions;

export default notesSlice.reducer;
