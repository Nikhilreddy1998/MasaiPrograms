import { createSlice } from '@reduxjs/toolkit';
import { mockProperties } from '../../data/mockData.js';

const initialState = {
  allProperties: mockProperties,
  filteredProperties: mockProperties,
  currentProperty: null,
  viewMode: 'grid', // 'grid', 'list', 'map'
  sortBy: 'newest',
  isLoading: false,
  currentPage: 1,
  hasMore: true,
};

const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setFilteredProperties: (state, action) => {
      state.filteredProperties = action.payload;
    },
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      // Sort the filtered properties
      const sorted = [...state.filteredProperties].sort((a, b) => {
        switch (action.payload) {
          case 'price-low':
            return a.price - b.price;
          case 'price-high':
            return b.price - a.price;
          case 'newest':
            return new Date(b.dateAdded) - new Date(a.dateAdded);
          case 'oldest':
            return new Date(a.dateAdded) - new Date(b.dateAdded);
          default:
            return 0;
        }
      });
      state.filteredProperties = sorted;
    },
    loadMoreProperties: (state) => {
      state.currentPage += 1;
      // Simulate loading more properties
      if (state.currentPage > 3) {
        state.hasMore = false;
      }
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setFilteredProperties,
  setCurrentProperty,
  setViewMode,
  setSortBy,
  loadMoreProperties,
  setLoading,
} = propertiesSlice.actions;

export default propertiesSlice.reducer;