import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  managedProperties: [],
  isLoading: false,
  error: null,
  stats: {
    totalProperties: 0,
    totalInquiries: 0,
    totalUsers: 0,
    recentActivity: []
  }
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    addProperty: (state, action) => {
      const newProperty = {
        ...action.payload,
        id: Date.now(),
        dateAdded: new Date().toISOString(),
        agent: action.payload.agent || {
          name: 'Admin User',
          phone: '(555) 000-0000',
          email: 'admin@propertyhub.com'
        }
      };
      state.managedProperties.push(newProperty);
      state.stats.totalProperties += 1;
    },
    updateProperty: (state, action) => {
      const { propertyId, updates } = action.payload;
      const propertyIndex = state.managedProperties.findIndex(property => property.id === propertyId);
      if (propertyIndex !== -1) {
        state.managedProperties[propertyIndex] = { 
          ...state.managedProperties[propertyIndex], 
          ...updates 
        };
      }
    },
    deleteProperty: (state, action) => {
      const propertyId = action.payload;
      state.managedProperties = state.managedProperties.filter(property => property.id !== propertyId);
      state.stats.totalProperties -= 1;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    addRecentActivity: (state, action) => {
      state.stats.recentActivity.unshift(action.payload);
      if (state.stats.recentActivity.length > 10) {
        state.stats.recentActivity = state.stats.recentActivity.slice(0, 10);
      }
    }
  }
});

export const {
  addProperty,
  updateProperty,
  deleteProperty,
  setLoading,
  setError,
  updateStats,
  addRecentActivity
} = adminSlice.actions;

export default adminSlice.reducer;