import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageSize: 5,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setPageSize } = settingsSlice.actions;
export const selectPageSize = (state) => state.settings.pageSize;
export default settingsSlice.reducer;
