import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';
import taskReducer from '../reducers/taskReducer';

// optional dev‑only logger
const middleware = [];
if (process.env.NODE_ENV === 'development') {
  const { logger } = require('redux-logger');
  middleware.push(logger);
}

const store = configureStore({
  reducer: {
    auth:  authReducer,
    tasks: taskReducer,
  },
  middleware: (getDefault) => getDefault().concat(middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
