import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  firstname: null,
  lastname: null,
  email: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.firstname = action.payload.firstname
      state.lastname = action.payload.lastname
      state.email = action.payload.email
    },
    clearUser(state) {
      state.firstname = null
      state.lastname = null
      state.email = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer