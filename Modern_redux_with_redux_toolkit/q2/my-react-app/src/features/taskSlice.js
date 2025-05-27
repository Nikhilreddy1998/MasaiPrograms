import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: [] }

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addTask(state, action) {
      state.value.push(action.payload)
    },
  },
})

export const { addTask } = taskSlice.actions
export default taskSlice.reducer