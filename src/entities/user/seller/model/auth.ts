import { createSlice } from '@reduxjs/toolkit';

export interface AuthSellerState {
  isLoggedIn: boolean;
}

const initialState: AuthSellerState = {
  isLoggedIn: false,
};

export const clientAuthSlice = createSlice({
  name: 'sellerAuth',
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
