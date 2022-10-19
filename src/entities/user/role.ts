import { createSlice } from '@reduxjs/toolkit';
// import type { PayloadAction } from '@reduxjs/toolkit';

export interface RoleState {
  role: string;
}

const initialState: RoleState = {
  role: localStorage.getItem('role') || 'GHOST',
};

export const userRoleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setClient: (state: RoleState) => {
      state.role = 'CLIENT';
    },
    setSeller: (state: RoleState) => {
      state.role = 'SELLER';
    },
    setGhost: (state: RoleState) => {
      state.role = 'GHOST';
    },
  },
});

export const { setClient, setSeller, setGhost } = userRoleSlice.actions;

export default userRoleSlice.reducer;
