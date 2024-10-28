import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  showSidebar: boolean;
  showAdminSidebar: boolean;
  isPending: boolean;
};
const initialState: initialStateType = {
  showSidebar: false,
  showAdminSidebar: true,
  isPending: false
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
    },
    setIsPending: (state) => {
      state.isPending = true;
    },
    disableIsPending: (state) => {
      state.isPending = false;
    }
  }
});

export const { toggleSidebar, closeSidebar, toggleAdminSidebar, setIsPending, disableIsPending } = uiSlice.actions;

export default uiSlice.reducer;
