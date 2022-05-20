import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null as any | null,
  },
  reducers: {
    login: (state, action: any) => {
      return state = {
        ...state,
        token: action.payload,
      };
    },
    logout: state => {
      return state = { ...state, token: null };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
