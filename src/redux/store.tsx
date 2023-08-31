import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth.slice";
import usersSlice from "./users/users.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    users: usersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
