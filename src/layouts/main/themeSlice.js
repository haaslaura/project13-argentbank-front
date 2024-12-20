import { createSlice } from '@reduxjs/toolkit'

let initialState = {
  isDark: false, // By default, bg-dark is not applied to <main>
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    enableDarkMode: (state) => {
      state.isDark = true
    },
    disableDarkMode: (state) => {
      state.isDark = false
    },
  },
});

export const { enableDarkMode, disableDarkMode } = themeSlice.actions
export default themeSlice.reducer