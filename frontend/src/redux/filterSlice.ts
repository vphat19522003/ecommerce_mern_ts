import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  mainCategory?: string;
  subCategory?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  sort?: number;
};

const initialState: initialStateType = {
  mainCategory: '',
  subCategory: '',
  minPrice: 0,
  maxPrice: 0,
  rating: 0,
  sort: 5
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<initialStateType>) => {
      return { ...state, ...action.payload };
    },
    setFilterPrice: (state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) => {
      return { ...state, minPrice: action.payload.minPrice, maxPrice: action.payload.maxPrice };
    },
    resetFilter: () => {
      return initialState;
    }
  }
});

export const { setFilter, resetFilter, setFilterPrice } = filterSlice.actions;

export default filterSlice.reducer;
