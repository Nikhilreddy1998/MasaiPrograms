import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEstablishments } from '../../services/api';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  searchTerm: '',
  currentPage: 1
};

export const fetchEstablishmentsAsync = createAsyncThunk(
  'establishments/fetchEstablishments',
  async () => {
    try {
      const response = await fetchEstablishments();
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const establishmentsSlice = createSlice({
  name: 'establishments',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEstablishmentsAsync.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEstablishmentsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchEstablishmentsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm, setCurrentPage } = establishmentsSlice.actions;

export const selectEstablishments = (state) => state.establishments.items;
export const selectEstablishmentsStatus = (state) => state.establishments.status;
export const selectEstablishmentsError = (state) => state.establishments.error;
export const selectSearchTerm = (state) => state.establishments.searchTerm;
export const selectCurrentPage = (state) => state.establishments.currentPage;

export default establishmentsSlice.reducer;