import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    token: null,
    isAuthentificated: false,
  }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token // Store token
      state.isAuthentificated = true // Updates authentication status
    },
    logout(state) {
      state.token = null
      state.isAuthentificated = false
    },
  },
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer