import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../layouts/main/themeSlice'
import authReducer from '../components/signIn/authSlice'

export const store = configureStore({
  reducer: {
    // We add the slice for the bg-dark's <main> to the store:
    theme: themeReducer,
    // We add the slice for the authentication to the store:
    auth: authReducer,
  }
})