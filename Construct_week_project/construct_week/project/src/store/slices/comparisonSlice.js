import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comparisonList: [],
  maxComparisons: 3,
};

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState,
  reducers: {
    addToComparison: (state, action) => {
      const propertyId = action.payload;
      if (!state.comparisonList.includes(propertyId) && state.comparisonList.length < state.maxComparisons) {
        state.comparisonList.push(propertyId);
      }
    },
    removeFromComparison: (state, action) => {
      const propertyId = action.payload;
      state.comparisonList = state.comparisonList.filter(id => id !== propertyId);
    },
    clearComparison: (state) => {
      state.comparisonList = [];
    },
  },
});

export const { addToComparison, removeFromComparison, clearComparison } = comparisonSlice.actions;

export default comparisonSlice.reducer;