import { createSlice } from '@reduxjs/toolkit';

export interface ThemeState {
  darkThemeEnabled: boolean;
}

const initialState: ThemeState = {
  darkThemeEnabled: !!localStorage.getItem('darkThemeEnabled'),
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    enableDarkTheme: (state: ThemeState) => {
      state.darkThemeEnabled = true;
    },
    disableDarkTheme: (state: ThemeState) => {
      state.darkThemeEnabled = false;
    },
  },
});

export const { enableDarkTheme, disableDarkTheme } = themeSlice.actions;

export default themeSlice.reducer;
