import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  editingMode: false, // By default, the profile editor is closed
}

const editingSlice = createSlice({
  name: 'edit',
  initialState,
  reducers: {
    enableEditingMode: (state) => {
      state.editingMode = true
    },
    disableEditingMode: (state) => {
      state.editingMode = false
    },
  },
});

export const { enableEditingMode, disableEditingMode } = editingSlice.actions

export default editingSlice.reducer