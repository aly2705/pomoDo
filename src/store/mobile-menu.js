import { createSlice } from '@reduxjs/toolkit';

const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState: {
    isOpened: false,
  },
  reducers: {
    toggleMenu(state) {
      state.isOpened = !state.isOpened;
    },
  },
});

export const mobileMenuActions = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
