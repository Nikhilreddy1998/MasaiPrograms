import { createSlice } from '@reduxjs/toolkit';

const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    memberSince: "2023-01-15",
    phone: "123-456-7890",
    address: "123 Main St, City, State",
    preferences: ["Fiction", "Mystery"],
    active: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    memberSince: "2023-03-20",
    phone: "098-765-4321",
    address: "456 Oak Ave, City, State",
    preferences: ["Romance", "Historical Fiction"],
    active: true,
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@library.com",
    role: "librarian",
    memberSince: "2022-01-01",
    phone: "555-123-4567",
    address: "Library Administration",
    preferences: [],
    active: true,
  }
];

const initialState = {
  users: sampleUsers,
  currentUserProfile: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setCurrentUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
    updateUserPreferences: (state, action) => {
      const { userId, preferences } = action.payload;
      const user = state.users.find(user => user.id === userId);
      if (user) {
        user.preferences = preferences;
      }
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setCurrentUserProfile,
  updateUserPreferences,
} = usersSlice.actions;

export default usersSlice.reducer;