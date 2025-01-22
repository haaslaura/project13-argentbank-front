import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserProfile } from '../../services/userService'


/**
 * Slice for managing user state
 */

// Asynchronous action to retrieve user data
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (token, { rejectWithValue }) => {
    
    try {
      const data = await fetchUserProfile(token)
      return {
        firstName: data.body.firstName,
        lastName: data.body.lastName,
      }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)


const initialState = {
  firstName: null,
  lastName: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
}


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clearUser(state) {
      state.firstName = null
      state.lastName = null
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName

      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer