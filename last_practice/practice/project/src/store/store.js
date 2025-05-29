import { configureStore } from '@reduxjs/toolkit';
import establishmentsReducer from './slices/establishmentsSlice';
import bookmarksReducer from './slices/bookmarksSlice';

export const store = configureStore({
  reducer: {
    establishments: establishmentsReducer,
    bookmarks: bookmarksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['bookmarks/addBookmark/fulfilled'],
      },
    }),
});