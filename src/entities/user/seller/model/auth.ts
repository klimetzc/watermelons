import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthSellerState {
  isLoggedIn: boolean;
}

const initialState: AuthSellerState = {
  isLoggedIn: false,
};

export const clientAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    login: (state: AuthSellerState) => {
      state.isLoggedIn = true;
    },
    logout: (state: AuthSellerState) => {
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = clientAuthSlice.actions;

export default clientAuthSlice.reducer;
