import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("accessToken"),
    user: null,
    token: localStorage.getItem("accessToken") || null,
  },
  reducers: {
    login: (state, action) => {
      const { email, accessToken } = action.payload;
      state.isAuthenticated = true;
      state.user = email;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuthStatus = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
