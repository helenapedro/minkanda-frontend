export const setLoadingState = (state) => {
     state.loading = true;
     state.error = null;
};
   
export const setErrorState = (state, action) => {
     state.updateNoteStatus = 'rejected';
     state.error = action.payload;
};

export const setNotesSuccessState = (state, action) => {
state.loading = false;
state.notes = action.payload.content;
state.totalPages = action.payload.totalPages;
};

export const setPublicNotesSuccessState = (state, action) => {
state.loading = false;
state.publicNotes = action.payload.content;
state.publicTotalPages = action.payload.totalPages;
};
   