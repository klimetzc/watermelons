import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import UserData from '../lib/types/types';

export interface ProfileState {
  userdata: UserData;
  isFilled: boolean;
}

const initialState: ProfileState = {
  userdata: {
    name: 'Имя не установлено',
    surname: 'Отчество не установлена',
    family: 'Фамилия не установлена',
    phone: '0',
    address: 'Адрес не установлен',
  },
  isFilled: false,
};

export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    updateProfile: (state: ProfileState, payload: PayloadAction<UserData>) => {
      state.userdata = { ...state.userdata, ...payload.payload };
    },
    setIsFilled: (state: ProfileState, payload: PayloadAction<boolean>) => {
      state.isFilled = payload.payload;
    },
  },
});

export const { updateProfile, setIsFilled } = userProfileSlice.actions;

export default userProfileSlice.reducer;
