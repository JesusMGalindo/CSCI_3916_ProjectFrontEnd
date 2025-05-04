// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from '../reducers/authReducer';
import taskReducer from '../reducers/taskReducer';

const middleware = [];

// Thunk is already part of getDefaultMiddleware, but if you want it explicit:
middleware.push(thunk);

// Add logger only in development
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefault) => getDefault().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
