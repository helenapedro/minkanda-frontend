export const setLoadingState = (state) => {
     state.loading = true;
     state.error = null;
};
   
export const setErrorState = (state, action) => {
state.loading = false;
state.error = action.error.message;
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
   