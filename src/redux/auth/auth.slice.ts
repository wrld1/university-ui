import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: false, user: null, token: null },
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
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
