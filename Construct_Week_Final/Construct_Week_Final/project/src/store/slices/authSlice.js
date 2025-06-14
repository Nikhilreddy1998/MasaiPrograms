import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const saveUserToStorage = (user) => {
  try {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  } catch {
    // Handle storage error silently
  }
};

const initialState = {
  currentUser: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  users: [
    {
      id: 1,
      email: 'admin@propertyhub.com',
      password: 'admin123',
      role: 'admin',
      name: 'Admin User',
      phone: '(555) 000-0000',
      avatar: null,
      createdAt: '2024-01-01'
    }
  ],
  userInquiries: [],
  isLoading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      saveUserToStorage(action.payload);
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.currentUser = null;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      saveUserToStorage(null);
    },
    registerUser: (state, action) => {
      const newUser = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      state.users.push(newUser);
    },
    updateUserProfile: (state, action) => {
      const { userId, updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
        if (state.currentUser && state.currentUser.id === userId) {
          state.currentUser = { ...state.currentUser, ...updates };
          saveUserToStorage(state.currentUser);
        }
      }
    },
    addUserInquiry: (state, action) => {
      const inquiry = {
        ...action.payload,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };
      state.userInquiries.push(inquiry);
    },
    updateInquiryStatus: (state, action) => {
      const { inquiryId, status } = action.payload;
      const inquiryIndex = state.userInquiries.findIndex(inquiry => inquiry.id === inquiryId);
      if (inquiryIndex !== -1) {
        state.userInquiries[inquiryIndex].status = status;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerUser,
  updateUserProfile,
  addUserInquiry,
  updateInquiryStatus,
  clearError
} = authSlice.actions;

export default authSlice.reducer;