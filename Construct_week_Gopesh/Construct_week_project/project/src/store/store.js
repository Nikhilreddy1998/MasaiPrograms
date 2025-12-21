import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import booksReducer from './slices/booksSlice';
import usersReducer from './slices/usersSlice';
import borrowingReducer from './slices/borrowingSlice';
import notificationsReducer from './slices/notificationsSlice';
import uiReducer from './slices/uiSlice';
import eventsReducer from './slices/eventsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    users: usersReducer,
    borrowing: borrowingReducer,
    notifications: notificationsReducer,
    ui: uiReducer,
    events: eventsReducer,
  },
});

export default store;