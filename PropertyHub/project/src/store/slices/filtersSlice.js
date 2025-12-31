import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  propertyType: 'all',
  priceRange: [0, 5000000],
  bedrooms: 'any',
  bathrooms: 'any',
  location: '',
  amenities: [],
  isFilterPanelOpen: false,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setBedrooms: (state, action) => {
      state.bedrooms = action.payload;
    },
    setBathrooms: (state, action) => {
      state.bathrooms = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    toggleFilterPanel: (state) => {
      state.isFilterPanelOpen = !state.isFilterPanelOpen;
    },
    resetFilters: (state) => {
      return { ...initialState, isFilterPanelOpen: state.isFilterPanelOpen };
    },
  },
});

export const {
  setSearchQuery,
  setPropertyType,
  setPriceRange,
  setBedrooms,
  setBathrooms,
  setLocation,
  setAmenities,
  toggleFilterPanel,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;