import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { fetchNotes, fetchNoteById, fetchPublicNotes, addNote, updateNote, toggleNotePrivacy, deleteNote } from '../services/api';

const initialState = {
  notes: [],
  selectedNote: null,
  totalPages: 0,
  publicTotalPages: 0,
  updateNoteStatus: 'idle',
  loading: false,
  error: null,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateNoteStatus = 'idle';
    },

    clearSelectedNote: (state) => {
      state.selectedNote = null;
    },

    clearSuccessMessage: (state) => {
      state.successMessage = '';
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
        state.loading = false;
        state.updateNoteStatus = 'fulfilled';
        state.error = null;
        state.successMessage = 'Note updated successfully.';
        
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

      .addCase(toggleNotePrivacyAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleNotePrivacyAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        // Update the note's `isPublic` property in the state
        const index = state.notes.findIndex((note) => note.nid === action.payload.nid);
        if (index !== -1) {
          state.notes[index].isPublic = action.payload.isPublic;
        }
      })
      .addCase(toggleNotePrivacyAsync.rejected, (state, action) => {
        state.loading = false;
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


export const fetchNotesAsync = createAsyncThunk('notes/fetchNotes', 
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
  async ({ nid, title, body, ...restOfNote }) => {
    const updateData = { nid, title, body, ...restOfNote };
    const response = await updateNote(nid, updateData);
    return response;
  }
);

export const toggleNotePrivacyAsync = createAsyncThunk(
  'notes/togglePrivacy', 
  async (noteId) => {
    const response = await toggleNotePrivacy(noteId);
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


export const togglePrivacySuccess = createAction('notes/togglePrivacySuccess');

export const { resetUpdateStatus, clearSelectedNote, clearSuccessMessage } = notesSlice.actions;

export default notesSlice.reducer;
