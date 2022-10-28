import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: (state: AuthState) => {
      state.isLoggedIn = true;
    },
    logout: (state: AuthState) => {
      state.isLoggedIn = false;
    },
  },
});

// export const { login, logout } = userAuthSlice.actions;

export const userAuth = userAuthSlice.actions;

export default userAuthSlice.reducer;
