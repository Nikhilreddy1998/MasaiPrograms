import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    todos: [], // Array to store tasks
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(), // Unique ID using timestamp
        text: action.payload,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = tasksSlice.actions;
export default tasksSlice.reducer;