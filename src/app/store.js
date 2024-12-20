import { configureStore } from '@reduxjs/toolkit'
import themeReducer from '../layouts/main/themeSlice'

export const store = configureStore({
  reducer: {
    // We add the slice for the bg-dark's <main> to the store :
    theme: themeReducer,
  }
})