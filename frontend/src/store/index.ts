import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@app/redux/authSlice';
import uiSlice from '@app/redux/uiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
