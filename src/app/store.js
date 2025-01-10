import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../layouts/main/themeSlice'
import authReducer from '../features/auth/authSlice'
import editingSlice from '../features/editProfile/editingSlice'

export const store = configureStore({
  reducer: {
    // We add the slice for the bg-dark's <main> to the store:
    theme: themeReducer,
    // We add the slice for the authentication to the store:
    auth: authReducer,
    // The slice to manage the opening of the profile editor:
    edit: editingSlice,
  }
})