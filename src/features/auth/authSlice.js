import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    token: null,
    isAuthentificated: false,
    persist: false
  }

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token // Store token
      state.isAuthentificated = true // Updates authentication status
      state.persist = action.payload.persist || false // Defines whether the user wants to remember the session
    },
    logout(state) {
      state.token = null
      state.isAuthentificated = false
      state.persist = false
    },
  },
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer