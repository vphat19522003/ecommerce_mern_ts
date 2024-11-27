import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@app/redux/authSlice';
import filterSlice from '@app/redux/filterSlice';
import uiSlice from '@app/redux/uiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice,
    filter: filterSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
