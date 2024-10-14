import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  showSidebar: boolean;
  showAdminSidebar: boolean;
};
const initialState: initialStateType = {
  showSidebar: false,
  showAdminSidebar: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
    },
    closeSidebar: (state) => {
      state.showSidebar = false;
    },
    toggleAdminSidebar: (state) => {
      state.showAdminSidebar = !state.showAdminSidebar;
    }
  }
});

export const { toggleSidebar, closeSidebar, toggleAdminSidebar } = uiSlice.actions;

export default uiSlice.reducer;
