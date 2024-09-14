import { configureStore } from '@reduxjs/toolkit';

import authSlice from '@app/redux/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
