import { configureStore } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import { termSlice } from '../slice/termSlice';

const store = configureStore({
  reducer: {
    form: formReducer,
    termSlice: termSlice.reducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;