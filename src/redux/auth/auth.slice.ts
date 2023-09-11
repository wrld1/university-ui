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
    setAccessToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { logOut, setAccessToken, setIsAuthenticated, setUser } =
  authSlice.actions;

export default authSlice.reducer;

export const selectCurrentAuthStatus = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.token;
