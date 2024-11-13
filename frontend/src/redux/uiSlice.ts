import { createSlice } from '@reduxjs/toolkit';

import { ProductCardType } from '@app/components/organisms/productCard';

type initialStateType = {
  showSidebar: boolean;
  showAdminSidebar: boolean;
  showProductDetailSidebar: boolean;
  isPending: boolean;
  productDetailData: ProductCardType | undefined;
};
const initialState: initialStateType = {
  showSidebar: false,
  showAdminSidebar: true,
  showProductDetailSidebar: false,
  isPending: false,
  productDetailData: undefined
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
    toggleProductSidebar: (state, action) => {
      state.showProductDetailSidebar = !state.showProductDetailSidebar;
      state.showSidebar = false;
      state.productDetailData = action.payload;
    },
    closeProductSidebar: (state) => {
      state.showProductDetailSidebar = false;
      state.productDetailData = undefined;
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
