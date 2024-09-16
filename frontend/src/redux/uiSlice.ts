import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  showSidebar: boolean;
};
const initialState: initialStateType = {
  showSidebar: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    closeSidebar: (state) => {
      state.showSidebar = false; // Action để đóng sidebar
    }
  }
});

export const { toggleSidebar, closeSidebar } = uiSlice.actions;

export default uiSlice.reducer;
