import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, push, get, child, remove } from "firebase/database";
import { database } from './firebase';

import { mockEstablishments } from './data/mockHygieneData';
export const fetchHygieneData = createAsyncThunk(
  'hygiene/fetchData',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockEstablishments;
  }
);

const hygieneSlice = createSlice({
  name: 'hygiene',
  initialState: { data: [], filtered: [], status: 'idle', searchTerm: '' },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.filtered = state.data.filter(item =>
        item.BusinessName.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        item.PostCode.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHygieneData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHygieneData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchHygieneData.rejected, (state, action) => {
        state.status = 'failed';
        console.error("Failed to fetch hygiene data:", action.error);
      });
  },
});
export const addBookmark = createAsyncThunk(
  'bookmarks/add',
  async (premise) => {
    const bookmarkRef = ref(database, 'bookmarkedPremises');
    const newBookmarkRef = await push(bookmarkRef, premise);
    return { id: newBookmarkRef.key, ...premise };
  }
);

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetch',
  async () => {
    const snapshot = await get(child(ref(database), `bookmarkedPremises`));
    const bookmarks = [];
    if (snapshot.exists()) {
      snapshot.forEach(child => bookmarks.push({ id: child.key, ...child.val() }));
    }
    return bookmarks;
  }
);

export const removeBookmark = createAsyncThunk(
  'bookmarks/remove',
  async (id) => {
    await remove(ref(database, `bookmarkedPremises/${id}`));
    return id;
  }
);

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState: { items: [], status: 'idle' },
  extraReducers: (builder) => {
    builder
      .addCase(addBookmark.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addBookmark.rejected, (state, action) => {
        state.status = 'failed';
        console.error("Failed to add bookmark:", action.error);
      })
      .addCase(fetchBookmarks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.status = 'failed';
        console.error("Failed to fetch bookmarks:", action.error);
      })
      .addCase(removeBookmark.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeBookmark.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
        state.status = 'succeeded';
      })
      .addCase(removeBookmark.rejected, (state, action) => {
        state.status = 'failed';
        console.error("Failed to remove bookmark:", action.error);
      });
  },
});

export const { setSearchTerm } = hygieneSlice.actions;
export const store = configureStore({
  reducer: {
    hygiene: hygieneSlice.reducer,
    bookmarks: bookmarksSlice.reducer,
  },
});
