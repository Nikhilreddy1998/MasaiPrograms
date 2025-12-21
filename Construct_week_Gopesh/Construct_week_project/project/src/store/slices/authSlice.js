import { createSlice } from '@reduxjs/toolkit';

// Mock users database
const mockUsers = [
  { 
    id: 1, 
    email: 'admin@library.com', 
    password: 'admin123', 
    role: 'librarian', 
    name: 'Admin User',
    phone: '555-123-4567',
    address: 'Library Administration',
    memberSince: '2022-01-01',
    active: true
  },
  { 
    id: 2, 
    email: 'user@library.com', 
    password: 'user123', 
    role: 'user', 
    name: 'John Doe',
    phone: '123-456-7890',
    address: '123 Main St, City, State',
    memberSince: '2023-01-15',
    active: true
  }
];

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registeredUsers: mockUsers,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    register: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        role: 'user',
        memberSince: new Date().toISOString().split('T')[0],
        active: true
      };
      state.registeredUsers.push(newUser);
      state.user = newUser;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, register, clearError } = authSlice.actions;
export default authSlice.reducer;