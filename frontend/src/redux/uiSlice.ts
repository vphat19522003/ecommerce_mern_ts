import { createSlice } from '@reduxjs/toolkit';

type initialStateType = {
  showSidebar: boolean;
  showAdminSidebar: boolean;
  showProductDetailSidebar: boolean;
  isPending: boolean;
};
const initialState: initialStateType = {
  showSidebar: false,
  showAdminSidebar: true,
  showProductDetailSidebar: false,
  isPending: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showSidebar = !state.showSidebar;
      state.showProductDetailSidebar = false;
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
    },
    toggleProductSidebar: (state) => {
      state.showProductDetailSidebar = !state.showProductDetailSidebar;
      state.showSidebar = false;
    },
    closeProductSidebar: (state) => {
      state.showProductDetailSidebar = false;
    }
  }
});

export const {
  toggleSidebar,
  closeSidebar,
  toggleAdminSidebar,
  setIsPending,
  disableIsPending,
  toggleProductSidebar,
  closeProductSidebar
} = uiSlice.actions;

export default uiSlice.reducer;
