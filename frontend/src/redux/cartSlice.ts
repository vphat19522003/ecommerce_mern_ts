import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ICart } from '@app/types/cart';

type initialStateType = {
  cart: ICart | null;
  totalQuantity: number;
};

const initialState: initialStateType = {
  cart: null,
  totalQuantity: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ cart: ICart | null; totalQuantity: number }>) => {
      state.cart = action.payload.cart;
      state.totalQuantity = action.payload.totalQuantity;
    },
    clearCart: (state) => {
      state.cart = null;
      state.totalQuantity = 0;
    }
  }
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
