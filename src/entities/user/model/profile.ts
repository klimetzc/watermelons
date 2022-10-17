import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import UserData from './types';

export interface ProfileState {
  userdata: UserData;
}

const initialState: ProfileState = {
  userdata: {
    name: 'Имя не установлено',
    surname: 'Фамилия не установлено',
    family: 'Что это? Семья? Еще одна фамилия?',
    phone: '0',
    address: 'Адрес не установлен',
  },
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateProfile: (state: ProfileState, payload: PayloadAction<UserData>) => {
      state.userdata = { ...state.userdata, ...payload };
    },
  },
});

export const { updateProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
