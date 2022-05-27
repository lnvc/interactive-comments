import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: null as string | null,
    username: null as string | null,
    id: null as number | null,
  },
  reducers: {
    login: (state, action: any) => {
      return state = {
        ...state,
        uid: action.payload,
      };
    },
    setUsername: (state, action: any) => {
      return state = {
        ...state,
        username: action.payload,
      }
    },
    setId: (state, action: any) => {
      return state = {
        ...state,
        id: action.payload,
      };
    },
    logout: state => {
      return state = {
        ...state,
        uid: null,
        username: null,
        id: null,
      };
    },
  },
});

export const { login, setUsername, setId, logout } = userSlice.actions;

export default userSlice.reducer;
