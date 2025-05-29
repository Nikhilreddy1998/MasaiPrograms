import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addBookmark, getBookmarks, removeBookmark } from '../../services/bookmarks';

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

export const fetchBookmarksAsync = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async () => {
    try {
      const bookmarks = await getBookmarks();
      return bookmarks;
    } catch (error) {
      throw error;
    }
  }
);

export const addBookmarkAsync = createAsyncThunk(
  'bookmarks/addBookmark',
  async (establishment) => {
    try {
      const newBookmark = await addBookmark(establishment);
      return newBookmark;
    } catch (error) {
      throw error;
    }
  }
);

export const removeBookmarkAsync = createAsyncThunk(
  'bookmarks/removeBookmark',
  async (id) => {
    try {
      await removeBookmark(id);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookmarksAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchBookmarksAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBookmarksAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBookmarkAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeBookmarkAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(bookmark => bookmark.id !== action.payload);
      });
  },
});

export const selectBookmarks = (state) => state.bookmarks.items;
export const selectBookmarksStatus = (state) => state.bookmarks.status;
export const selectBookmarksError = (state) => state.bookmarks.error;

export default bookmarksSlice.reducer;